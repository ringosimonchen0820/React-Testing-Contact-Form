import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";
import "mutationobserver-shim";
test("Able to render fields", () => {
  const { getByTestId } = render(<ContactForm />);
  getByTestId("first");
  getByTestId("last");
  getByTestId("email");
  getByTestId("message");
});

test("Able to type in fields", () => {
  const { getByTestId } = render(<ContactForm />);
  const inputFirst = getByTestId("first");
  const inputLast = getByTestId("last");
  const inputEmail = getByTestId("email");
  const inputMessage = getByTestId("message");

  fireEvent.change(inputFirst, { target: { value: "Hai" } });
  expect(inputFirst.value).toBe("Hai");
  fireEvent.change(inputLast, { target: { value: "hei" } });
  expect(inputLast.value).toBe("hei");
  fireEvent.change(inputEmail, {
    target: { value: "thisismyemail@gmail.com" }
  });
  expect(inputEmail.value).toBe("thisismyemail@gmail.com");
  fireEvent.change(inputMessage, {
    target: { value: "Hi this is my message!" }
  });
  expect(inputMessage.value).toBe("Hi this is my message!");
});
test("Fail this test, can't submit form with no entries", () => {
  const { getByTestId } = render(<ContactForm />);
  fireEvent.click(getByTestId("buttonForSubmit"));
  getByTestId("dataForSubmit");
});
test("When form is filled, can submit", async () => {
  const { getByTestId } = render(<ContactForm />);

  const inputFirst = getByTestId("first");
  const inputLast = getByTestId("last");
  const inputEmail = getByTestId("email");
  const inputMessage = getByTestId("message");

  fireEvent.change(inputFirst, { target: { value: "Hai" } });
  fireEvent.change(inputLast, { target: { value: "Hei" } });
  fireEvent.change(inputEmail, {
    target: { value: "thisisanemail@gmail.com" }
  });
  fireEvent.change(inputMessage, {
    target: { value: "Hi this is my message!" }
  });

  fireEvent.click(getByTestId("buttonForSubmit"));
  await waitForElement(() => getByTestId("dataForSubmit"));
});
