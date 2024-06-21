import gsap from "gsap";

export const numbersAnim = (numbers) => {
  const tl = gsap.timeline();

  tl.to(numbers, {
    textContent: "100",
    duration: 4,
    roundProps: "textContent",
    ease: 'none',
  });

  return tl;
};

export const hideloader = (loader, numbers) => {
  const tl = gsap.timeline();

  tl.to(loader, {
    height: 0,
    duration: 1,
    delay: .7,
    ease: "power4.inOut",
  }).to(numbers, {
    opacity: 0
  }, '<30%')

  return tl;
}
