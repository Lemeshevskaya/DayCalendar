import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import shortid from 'shortid';

export default function AddEvent({ addEvent , itemEvent}) {
  console.log(itemEvent);
  console.log(itemEvent ? itemEvent.eventname : '');
  const startDay = "09:00 am";
  const endDay = "9:00 pm";
  
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
        `The time must be between ${startDay} and ${endDay}.`,
        (value) =>
          moment(value, "hh:mm A").isSameOrAfter(moment(startDay, "hh:mm A")) &&
          moment(value, "hh:mm A").isSameOrBefore(moment(endDay, "hh:mm A"))
      ),
    endTime: Yup.string()
      .required("This field is required")
      .test(
        "period",
        `The time must be between ${startDay} and ${endDay}.`,
        (value) =>
          moment(value, "hh:mm A").isSameOrAfter(moment(startDay, "hh:mm A")) &&
          moment(value, "hh:mm A").isSameOrBefore(moment(endDay, "hh:mm A"))
      )
      .when("startTime", (startTime, schema) =>
        schema.test("is-greater", "end time should be greater", (value) =>
          moment(value, "hh:mm A").isSameOrAfter(moment(startTime, "hh:mm A"))
        )
      ),
  });

  return (
    <>
      <div>AddEvent</div>
      <Formik
        initialValues={{
          eventname: itemEvent ? itemEvent.eventname : '',
          location: itemEvent ? itemEvent.location : '',
          startTime: itemEvent ? itemEvent.startTime : '',
          endTime: itemEvent ? itemEvent.endTime : '',
          id: itemEvent ? itemEvent.id : '',
        }}
        validationSchema={EventSchema}
        onSubmit={(values, {resetForm}) => {
          let createId = shortid.generate();
          addEvent({
            ...values,
            id: createId,
            startTime: moment(values.startTime,"hh:mm A").format("hh:mm A").toString(),
            endTime: moment(values.endTime,"hh:mm A").format("hh:mm A").toString()
          });
          resetForm({values:''});
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
              <Field type="time" name="startTime" format="HH:mm A"/>
              {errors.startTime && touched.startTime && (
                <div>{errors.startTime}</div>
              )}
            </label>
            <label>
              End time
              <Field type="time" name="endTime" />
              {errors.endTime && touched.endTime && <div>{errors.endTime}</div>}
            </label>
            <button type="submit" text="Add event" disabled={errors.eventname || errors.location || errors.startTime || errors.endTime}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
