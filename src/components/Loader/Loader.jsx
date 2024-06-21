import React, { useRef } from 'react'

import './Loader.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { hideloader, numbersAnim } from './loaderAnim';

export const Loader = ({ setLoaderFinished }) => {
  const counterRef = useRef();
  const loaderRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaderFinished(true),
    });

    if(loaderRef) {
      tl.add(numbersAnim(counterRef.current));
      tl.add(hideloader(loaderRef.current, counterRef.current))
    }
  })

  return (
    <div className="loader" ref={loaderRef}>
      <span className="micro-text loader__counter" ref={counterRef}>00</span>
    </div>
  )
}
