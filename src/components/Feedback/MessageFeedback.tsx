import React from "react";
import Alert from "@mui/material/Alert";

interface MessageFeedbackProps {
  message: any;
  severity: any;
}

const MessageFeedback = ({ severity, message }: MessageFeedbackProps) => {
  return <Alert severity={severity}>{message}</Alert>;
};

export default MessageFeedback;
