const addInactiveCourseButton = document.querySelector("#addInactiveCourse");
const inactiveCoursesList = document.querySelector("#inactiveCourses");

addInactiveCourseButton.addEventListener("click", addInactiveCourse);

async function loadInactiveCourses() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["inactiveCourses"], (result) => resolve(result.inactiveCourses ? result.inactiveCourses : []));
  })
}

async function saveInactiveCourses(inactiveCourses) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ inactiveCourses }, () => resolve());
  })
}

async function reloadInactiveCourses() {
  const inactiveCourses = await loadInactiveCourses();
  inactiveCoursesList.innerHTML = '';

  for (const inactiveCourse of inactiveCourses) {
    const li = document.createElement("li");
    li.textContent = inactiveCourse + " ";

    const remove = document.createElement('a');
    remove.addEventListener('click', () => removeInactiveCourse(inactiveCourse));
    remove.href = '#';
    remove.textContent = "remove";
    li.appendChild(remove);

    inactiveCoursesList.appendChild(li);
  }
}

async function addInactiveCourse() {
  const courseName = prompt("Enter a course name");
  if (courseName) {
    const inactiveCourses = await loadInactiveCourses();
    inactiveCourses.push(courseName);
    await saveInactiveCourses(inactiveCourses);
    await reloadInactiveCourses();
  }
}

async function removeInactiveCourse(inactiveCourse) {
  await saveInactiveCourses(
    (await loadInactiveCourses())
      .filter(c => c !== inactiveCourse)
  );
  await reloadInactiveCourses();
}

reloadInactiveCourses();
