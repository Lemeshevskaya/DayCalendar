import React from "react";
import { Formik, Form, Field } from "formik";

export default function AddEvent({ event }) {
  const startDay = '09:00';
  const endDay = '21:00';
  function validatestring(value) {
    let error;
    if (!value) {
      error = "This field is required";
    } else if (typeof value !== "string") {
      error = "This field must be text and cannot contain only numbers";
    }
    return error;
  }

  function validatetime(value) {
    let error;
    if (value.toString() < startDay || value.toString() > endDay) {
      error = 'The time must be between 9 am and 9 pm.'
      console.log(value.toString());
      console.log(startDay);
      console.log(value.toString() < startDay);
    }
    return error;
  } 
  function validateperiod(value) {
    let error;
    if(formik.value.starttime > value.endtime) {
      error = "TTime";
      console.log(error)
    }
    return error

  }

  return (
    <>
      <div>AddEvent</div>
      <Formik
        initialValues={{
          eventname: "",
          location: "",
          starttime: "",
          endtime: "",
        }}
        onSubmit={(values) => {
          let error;
          console.log(values);
          if(values.starttime > values.endtime) {
             error = "TTime";
             console.log(error)
             return error
          } else {
            console.log(values);
          }
         
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>
              Name event
              <Field name="eventname" validate={validatestring} />
              {errors.eventname && touched.eventname && (
                <div>{errors.eventname}</div>
              )}
            </label>
            <label>
              Location
              <Field name="location" validate={validatestring} />
              {errors.location && touched.location && (
                <div>{errors.location}</div>
              )}
            </label>
            Start time
            <label>
              <Field
                type="time"
                name="starttime"
                validate={validatetime}
              />
              {errors.starttime && touched.starttime && (
                <div>{errors.starttime}</div>
              )}
            </label>
            <label>
              End time
              <Field type="time" name="endtime" validate= {validateperiod}/>
              {errors.endtime && touched.endtime && (
                <div>{errors.endtime}</div>
              )}
            </label>
            <button type="submit" text="Add event" name = 'addevent' disabled={!errors} >
            
              Submit
            </button>
            {errors.addevent && touched.addevent && (
                <div>{errors.addevent}</div>
              )}
          </Form>
        )}
      </Formik>
    </>
  );
}
