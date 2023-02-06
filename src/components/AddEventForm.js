import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import shortid from "shortid";

import '../assets/style/addEventForm.css'

export default function AddEvent({ addEvent, changeEvent, deleteEvent, itemEvent }) {
  console.log(itemEvent);
  console.log(itemEvent ? itemEvent.eventname : "");
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
      <Formik
        initialValues={{
          eventname: itemEvent ? itemEvent.eventname : "",
          location: itemEvent ? itemEvent.location : "",
          startTime: itemEvent ? itemEvent.startTime : "",
          endTime: itemEvent ? itemEvent.endTime : "",
          id: itemEvent ? itemEvent.id : shortid.generate(),
        }}
        enableReinitialize={true}
        validationSchema={EventSchema}
        onSubmit={(values, { resetForm }) => {
          itemEvent ? changeEvent(values) : addEvent(values);
          resetForm({ values: "" });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form__container">
            <label htmlFor="eventname">
              Name event
              </label>
              <Field name="eventname" label= 'Name event'/>
              {errors.eventname && touched.eventname && (
                <div className="form__error">{errors.eventname}</div>
              )}
            
            <label htmlFor="location">
              Location
              </label>
              <Field name="location" />
              {errors.location && touched.location && (
                <div className="form__error">{errors.location}</div>
              )}
            
            
            <label htmlFor="startTime">
            Start time
            </label>
              <Field type="time" name="startTime" />
              {errors.startTime && touched.startTime && (
                <div className="form__error">{errors.startTime}</div>
              )}
            
            <label htmlFor="endTime">
              End time
              </label>
              <Field type="time" name="endTime" />
              {errors.endTime && touched.endTime && <div className="form__error">{errors.endTime}</div>}
            
            {itemEvent ? (
              <>
              <button
                type="submit"
                text="Change event"
                disabled={
                  errors.eventname ||
                  errors.location ||
                  errors.startTime ||
                  errors.endTime
                }
              >
                Change event
              </button>
              <button onClick={(e) => deleteEvent(itemEvent)}>Delete event</button>
              </>
              
            ) : (
              <button
                type="submit"
                text="Add event"
                disabled={
                  errors.eventname ||
                  errors.location ||
                  errors.startTime ||
                  errors.endTime
                }
              >
                Submit
              </button>
            )}
            </div>
            
          </Form>
        )}
      </Formik>
    </>
  );
}
