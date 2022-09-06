import React from 'react'
import axios from "axios";

export default function Test() {
    function handleTest(){
       axios.post("/test")
    }
  return (
    <div>Test</div>
  )
}
