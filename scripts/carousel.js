let page = 1;

export function nextSlide() {
  const newSlide = page % 2;
  page++;

  showSlide(newSlide);
}

function showSlide(page) {
  page++;
  const $currentSlide = document.querySelector(".item.active");
  const $newSlide = document.querySelector(`.item:nth-child(${page})`);
  const $activeDot = document.querySelector(".dot.active");
  const $newActiveDot = document.querySelector(`.dot:nth-child(${page})`);

  $currentSlide.classList.remove("active");
  $newSlide.classList.add("active");
  $activeDot.classList.remove("active");
  $newActiveDot.classList.add("active");
}

export function dot($dot) {
  const isCurrentPage = $dot.srcElement.classList.value.includes("active");

  if (!isCurrentPage) {
    const newSlide = page % 2;

    showSlide(newSlide);
    page++;
  }
}
