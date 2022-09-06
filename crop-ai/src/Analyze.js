import React, { useEffect } from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";

export default function Analyze() {
    const analytics = getAnalytics()

    useEffect(()=>{
     logEvent( analytics, "analyzepage_visited")
     
    },[])

  return (
    <div>Analyze</div>
  )
}
