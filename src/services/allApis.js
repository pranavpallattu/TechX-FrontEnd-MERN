import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api for users
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/register`, reqBody, "")
}

// login Api admin and users
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody, "")
}

//  add course
export const addCourseApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/add-course`, reqBody, reqHeader)
}

// get course in adminpage
export const getCourseApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/get-courses`, "", reqHeader)
}

// add lectures
export const addLectureApi = async (id, reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/addlectures/${id}`, reqBody, reqHeader)
}

// get lectures
export const getLectureApi = async (id, reqHeader) => {
  return await commonApi("GET", `${serverUrl}/getlectures/${id}`, "", reqHeader)
}

// get courses in userhome
export const getUserCoursesApi = async () => {
  return await commonApi("GET", `${serverUrl}/availablecourses`);
};

//   specific course in course page
export const getSpecificCourseApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/availablecourses/${id}`);
};


// create razorpay order
export const createOrderApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/payment/create-order`, reqBody, reqHeader);
};

// verify payment
export const verifyPaymentApi = async (paymentData, headers) => {
  return await commonApi("POST", `${serverUrl}/payment/verify`, paymentData, headers);
};

// store payment
export const storePaymentApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/payment/store`, reqBody, reqHeader);
};

// get all user purchased courses
export const getUserPurchasedCoursesApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/user/purchased-courses`, "", reqHeader);
};

// api to delete courses
export const deleteCourseApi = async (id, reqHeader) => {
  return await commonApi("DELETE", `${serverUrl}/course/remove/${id}`, "", reqHeader)
}

// api to add coupons
export const addCouponApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/coupon/create`, reqBody, reqHeader)
}

// get all coupons
export const getCouponsApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/coupons`, "", reqHeader);
};

// api to delete coupon
export const deleteCouponApi = async (id, reqHeader) => {
  return await commonApi("DELETE", `${serverUrl}/coupon/remove/${id}`, "", reqHeader)
}

// get  coupons for a specific course 
export const getCouponsForCourseApi = async (id, reqHeader) => {
  return await commonApi("GET", `${serverUrl}/coupons/${id}`, "", reqHeader);
};

// Apply a coupon to a course
export const applyCouponApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/coupons/apply`, reqBody, reqHeader);
};

// get specific user's data
export const getUserDataApi = async (id, reqHeader) => {
  return await commonApi("GET", `${serverUrl}/user/data/${id}`, "", reqHeader)
}

// edit coupon api
export const editCouponApi = async (id, reqBody, reqHeader) => {
  return await commonApi("PUT", `${serverUrl}/coupon/edit/${id}`, reqBody, reqHeader)
}


// edit course api
export const editCourseApi = async (id, reqBody, reqHeader) => {
  return await commonApi("PUT", `${serverUrl}/course/update/${id}`, reqBody, reqHeader)
}

// delete lecture api
export const deleteLectureApi = async (id, reqHeader) => {
  return await commonApi("DELETE", `${serverUrl}/lecture/delete/${id}`, undefined, reqHeader);
};

// get all users data
export const getAllUsersApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/allusers`, undefined, reqHeader)
}

// delete user api
export const deleteUserApi = async (id, reqHeader) => {
  return await commonApi("DELETE", `${serverUrl}/user/delete/${id}`, undefined, reqHeader);
};
