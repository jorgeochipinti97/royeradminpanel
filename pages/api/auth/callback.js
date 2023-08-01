import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const callbackHandler = async (req, res) => {
  try {
    await handleCallback(req, res);
  } catch (error) {
    res.status(error);
  }
};

export default callbackHandler;