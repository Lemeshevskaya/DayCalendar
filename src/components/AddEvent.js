import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";

export default function AddEvent({ event }) {
  const startDay = "09:00";
  const endDay = "21:00";
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const EventSchema = Yup.object().shape({
    eventname: Yup.string()
      .required("This field is required")
      .test(
        "not-only-number",
        "This field must be text and cannot contain only numbers",
        (value) => (value ? !value.match(/^\d+$/) : false)
      ),
    location: Yup.string()
      .required("This field is required")
      .test(
        "not-only-number",
        "This field must be text and cannot contain only numbers",
        (value) => (value ? !value.match(/^\d+$/) : false)
      ),
    startTime: Yup.string()
      .required("This field is required")
      .test(
        "period",
        "The time must be between 9 am and 9 pm.",
        (value) =>
          moment(value, "HH:mm").isSameOrAfter(moment(startDay, "HH:mm")) &&
          moment(value, "HH:mm").isSameOrBefore(moment(endDay, "HH:mm"))
      ),
    endTime: Yup.string()
      .required("This field is required")
      .test(
        "period",
        "The time must be between 9 am and 9 pm.",
        (value) =>
          moment(value, "HH:mm").isSameOrAfter(moment(startDay, "HH:mm")) &&
          moment(value, "HH:mm").isSameOrBefore(moment(endDay, "HH:mm"))
      )
      .when("startTime", (startTime, schema) =>
        schema.test("is-greater", "end time should be greater", (value) =>
          moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"))
        )
      ),
  });

  return (
    <>
      <div>AddEvent</div>
      <Formik
        initialValues={{
          eventname: "",
          location: "",
          startTime: "",
          endTime: "",
        }}
        validationSchema={EventSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>
              Name event
              <Field name="eventname" />
              {errors.eventname && touched.eventname && (
                <div>{errors.eventname}</div>
              )}
            </label>
            <label>
              Location
              <Field name="location" />
              {errors.location && touched.location && (
                <div>{errors.location}</div>
              )}
            </label>
            Start time
            <label>
              <Field type="time" name="startTime" />
              {errors.startTime && touched.startTime && (
                <div>{errors.startTime}</div>
              )}
            </label>
            <label>
              End time
              <Field type="time" name="endTime" />
              {errors.endTime && touched.endTime && <div>{errors.endTime}</div>}
            </label>
            <button type="submit" text="Add event" disabled={!errors}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
