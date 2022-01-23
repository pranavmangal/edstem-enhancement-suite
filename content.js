const expandButtonSelector = "span.sbi-content";
const courseTabSelector = "span.sbi-content";

async function loadInactiveCourses() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["inactiveCourses"], (result) => resolve(result.inactiveCourses ? result.inactiveCourses : []));
  })
}

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

const coursesObserver = new MutationObserver(async function (mutations) {
  const inactiveCourses = {};
  for (const course of await loadInactiveCourses()) {
    inactiveCourses[course] = true;
  }

  for (const _ of mutations) {
    // Replace course codes with names in the sidebar
    if (document.querySelector(courseTabSelector)) {
      Object.values(document.querySelectorAll(courseTabSelector)).map(
        (course) => {
          const original = course.innerText;
          const [courseCode, courseName] = course.innerText.split(": ");
          if (courseName) {
            const content = `${courseName} <small style="opacity: 0.5">(${courseCode.replace("COMP ", "")})</small>`;
            if (inactiveCourses[original]) {
              course.innerHTML = `<strike style="opacity: 0.5">${content}</strike>`;
            } else {
              course.innerHTML = content;
            }
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
