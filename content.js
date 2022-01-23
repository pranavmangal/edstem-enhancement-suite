const expandButtonSelector = "span.sbi-content";
const courseTabSelector = "span.sbi-content";

const buttonObserver = new MutationObserver(function (mutations, observer) {
  for (const _ of mutations) {
    for (let tab of document.querySelectorAll(expandButtonSelector)) {
      if (tab.innerText.includes("more")) {
        // Expand to show all courses
        tab.click();
        observer.disconnect();
      }
    }
  }
});

const coursesObserver = new MutationObserver(function (mutations) {
  for (const _ of mutations) {
    // Replace course codes with names in the sidebar
    if (document.querySelector(courseTabSelector)) {
      Object.values(document.querySelectorAll(courseTabSelector)).map(
        (course) => {
          const [courseCode, courseName] = course.innerText.split(": ");
          if (courseName) {
            course.innerHTML = `${courseName} <small style="opacity: 0.5">(${courseCode.replace("COMP ", "")})</small>`;
          }
        }
      );
    }
  }
});

const observerConfig = {
  childList: true,
  subtree: true,
};

// Start observing the target nodes for configured mutations
buttonObserver.observe(document.body, observerConfig);
coursesObserver.observe(document.body, observerConfig);
