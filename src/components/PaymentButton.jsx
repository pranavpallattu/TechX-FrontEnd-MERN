import React, { useContext, useEffect, useState } from 'react';
import { createOrderApi, verifyPaymentApi, storePaymentApi } from '../services/allApis';
import { addPaymentContext } from '../context/ContextApi';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const PaymentButton = ({ courseId, amount }) => {
    const { setPaymentResponse } = useContext(addPaymentContext);
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    // Fetch token from sessionStorage on component mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handlePayment = async () => {
        try {
            if (!token) {
                await Swal.fire({
                    title: 'Authentication Required',
                    text: 'User is not authenticated. Please log in.',
                    icon: 'warning',
                    position: 'top-center',
                    timer: 3000,
                    showConfirmButton: false,
                });
                return;
            }

            if (!courseId || !amount) {
                await Swal.fire({
                    title: 'Invalid Course Details',
                    text: 'Please check the course details and try again.',
                    icon: 'warning',
                    position: 'center',
                    timer: 3000,
                    showConfirmButton: false,
                });
                return;
            }

            // Request headers
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            // Request body
            const reqBody = {
                amount,
                courseId,
                currency: "INR"
            };

            console.log('Request Body:', reqBody);

            // API call to create an order
            const result = await createOrderApi(reqBody, reqHeader);
            console.log("Create Order API Response:", result);

            if (!result?.data?.order?.id) {
                throw new Error("Invalid response from server");
            }

            const { id: order_id, amount: orderAmount, currency } = result.data.order;

            // Set up Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderAmount,
                currency,
                name: "E-learning Platform",
                description: "Course Enrollment",
                order_id,
                handler: async (response) => {
                    try {
                        console.log("Razorpay Response:", response);
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                        // Verify payment on the backend
                        const verifyResponse = await verifyPaymentApi({
                            paymentId: razorpay_payment_id,
                            orderId: razorpay_order_id,
                            signature: razorpay_signature
                        }, reqHeader);

                        console.log("Verification API Response:", verifyResponse);

                        if (!verifyResponse?.data?.success) {
                            throw new Error("Payment verification failed.");
                        }

                        const user = JSON.parse(sessionStorage.getItem("existingUser"));
                        const userId = user?._id;

                        if (!userId) throw new Error("User ID not found in session storage");

                        console.log("User ID:", userId);

                        // Store payment details
                        const storePaymentResponse = await storePaymentApi({
                            userId,
                            paymentId: razorpay_payment_id,
                            orderId: razorpay_order_id,
                            courseId,
                            amount,
                            currency: "INR"
                        }, reqHeader);

                        console.log("Store Payment Response:", storePaymentResponse);
                        setPaymentResponse(storePaymentResponse);

                        // ✅ Show success alert
                        await Swal.fire({
                            title: 'Payment Successful!',
                            text: `Amount: ₹${amount}\nPayment Id: ${razorpay_payment_id}`,
                            icon: 'success',
                            position: 'center',
                            timer: 4000,
                            showConfirmButton: false,
                        });

                        // ✅ Redirect after alert is dismissed
                        navigate("/payment");
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        await Swal.fire({
                            title: 'Payment Failed!',
                            text: 'Something went wrong. Please try again.',
                            icon: 'error',
                            position: 'center',
                            timer: 3000,
                            showConfirmButton: false,
                        });
                    }
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
            await Swal.fire({
                title: 'Payment Failed!',
                text: 'Something went wrong with the payment. Please try again.',
                icon: 'error',
                position: 'center',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    };

    return (
        <button style={{ backgroundColor: '#28a745' }} onClick={handlePayment} className="btn w-25 text-light p-2">
            Pay Now
        </button>
    );
};

export default PaymentButton;
