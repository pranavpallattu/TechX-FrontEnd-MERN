import React, { createContext, useState } from 'react'

export const addPaymentContext = createContext({})
export const addCourseContext = createContext({})
export const deleteCourseContext = createContext({})
export const editCourseContext = createContext([])
export const removeUserContext = createContext([])
export const editCouponContext = createContext([])
export const deleteCouponContext = createContext([])
export const loginResponseContext = createContext([])
export const lectureDeleteContext = createContext([])

function ContextApi({ children }) {
  const [paymentResponse, setPaymentResponse] = useState([])
  const [addCourseResponse, setAddCourseResponse] = useState([])
  const [deleteCourseResponse, setDeleteCourseResponse] = useState({})
  const [editCourseResponse, setEditCourseResponse] = useState([])
  const [removeUserResponse, setRemoveUserResponse] = useState([])
  const [editCouponResponse, setEditCouponResponse] = useState([])
  const [deleteCouponResponse, setDeleteCouponResponse] = useState([])
  const [loginResponse, setLoginResponse] = useState(false)
  const [lectureDeleteResponse, setLectureDeleteResponse] = useState([])
  return (
    <>

      <addPaymentContext.Provider value={{ paymentResponse, setPaymentResponse }}>
        <addCourseContext.Provider value={{ addCourseResponse, setAddCourseResponse }}>
          <deleteCourseContext.Provider value={{ deleteCourseResponse, setDeleteCourseResponse }}>
            <editCourseContext.Provider value={{ editCourseResponse, setEditCourseResponse }}>
              <removeUserContext.Provider value={{ removeUserResponse, setRemoveUserResponse }}>
                <editCouponContext.Provider value={{ editCouponResponse, setEditCouponResponse }}>
                  <deleteCouponContext.Provider value={{ deleteCouponResponse, setDeleteCouponResponse }}>
                    <loginResponseContext.Provider value={{ loginResponse, setLoginResponse }}>
                      <lectureDeleteContext.Provider value={{ lectureDeleteResponse, setLectureDeleteResponse }}>
                        {children}
                      </lectureDeleteContext.Provider>
                    </loginResponseContext.Provider>
                  </deleteCouponContext.Provider>
                </editCouponContext.Provider>
              </removeUserContext.Provider>
            </editCourseContext.Provider>
          </deleteCourseContext.Provider>
        </addCourseContext.Provider>
      </addPaymentContext.Provider>




    </>
  )
}

export default ContextApi