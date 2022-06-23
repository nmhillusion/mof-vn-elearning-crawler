(function main() {
  console.log("MOF eLearning Crawler");
  const PATTERN__QUESTION = /onmousemove="Tip\(&#39;(.+?)&#39;\)"/;
  const CORRECT_MARK = "[*]";

  const btnSubmit = document.querySelector("#btn-submit") as HTMLButtonElement;
  const inpContentEl = document.querySelector("#input-box") as HTMLInputElement;
  const resultListEl = document.querySelector(
    "#result-list"
  ) as HTMLTableElement;

  btnSubmit.onclick = (e) => {
    const inpContent = inpContentEl.value.trim();

    if (!inpContent) {
      alert("Content must be not empty");
      return;
    }

    console.log("input content: ", { inpContent });

    const questionsMatching = inpContent.matchAll(
      new RegExp(PATTERN__QUESTION, "gi")
    );
    console.log({ questionsMatching });

    if (questionsMatching) {
      while (resultListEl.firstChild) {
        resultListEl.removeChild(resultListEl.firstChild);
      }

      let questionIdx = 0;
      for (const qsMatching of questionsMatching) {
        const [_matched, qsGroup] = qsMatching;
        const parts = String(qsGroup)
          .split(/&lt;br \/\>/)
          .map((it) => it.replace(/&lt;\/?(br|b)(.*?)>/g, ""))
          .map((it) => it.replace(/&lt;font(.*?)>/g, ""))
          .map((it) => it.replace(/&lt;\/font(.*?)>/g, CORRECT_MARK))
          .filter((e) => e);
        console.log({ parts });

        buildQuestionFromParts(questionIdx, parts);
        questionIdx += 1;
      }

      if (0 == questionIdx) {
        alert("Does not contains any question from source-code");
      }
    }
  };

  function buildQuestionFromParts(questionIdx, parts: string[] = []) {
    if (parts && 0 < parts.length) {
      parts.unshift(`[${questionIdx + 1}]`);
      parts.push("---");
      for (const part of parts) {
        const trEl = document.createElement("tr");
        const tdEl = document.createElement("td");

        tdEl.textContent = part;
        if (part.endsWith(CORRECT_MARK)) {
          tdEl.classList.add("correct");
        }

        trEl.appendChild(tdEl);
        resultListEl.appendChild(trEl);
      }
    } else {
      alert("Does not contains any question from source-code");
    }
  }
})();
