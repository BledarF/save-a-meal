import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginForm from "./LoginForm";

function LoginModal(props) {
  return (
    <>
      <div className="login-modal-component justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className=" pb-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold p-2 pl-3 pb-1 m-0">
                Login
              </h3>
              <button
                className="p-2 pr-5 pb-1"
                onClick={() => props.setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}

            <div className="relative py-1 px-36 flex-auto">
              <LoginForm setShowModal={props.setShowModal} />
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default LoginModal;
