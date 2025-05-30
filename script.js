 // 1. 목차 생성
window.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.querySelector("#toc ul");
    tocContainer.innerHTML = "";

    const sections = document.querySelectorAll(".sect, .sect2, .sect3");

    sections.forEach(section => {
      const link = section.querySelector("a");
      const id = link.getAttribute("href").replace("#", "");
      const number = link.textContent.trim(); // ex: "2.1."
      const title = section.textContent.replace(number, "").trim(); // 제목만 추출

      let indent = 0;
      if (section.classList.contains("sect2")) indent = 1;
      if (section.classList.contains("sect3")) indent = 2;

      const li = document.createElement("li");
      li.style.paddingLeft = `${indent * 15}px`;

      // 숫자 링크
      const numLink = document.createElement("a");
      numLink.href = `#${id}`;
      numLink.textContent = number;
      numLink.style.marginRight = "4px";

      // 나머지 텍스트는 span으로 처리
      const label = document.createElement("span");
      label.textContent = title;

      li.appendChild(numLink);
      li.appendChild(label);
      tocContainer.appendChild(li);
    });
  });

  // 2. 최근 수정 시각
  window.addEventListener("DOMContentLoaded", () => {
    const now = new Date();

    // 날짜 포맷: yyyy-mm-dd hh:mm:ss
    const formatted = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, '0') + "-" +
      String(now.getDate()).padStart(2, '0') + " " +
      String(now.getHours()).padStart(2, '0') + ":" +
      String(now.getMinutes()).padStart(2, '0') + ":" +
      String(now.getSeconds()).padStart(2, '0');

    document.getElementById("modified-time").textContent = `최근 수정 시각: ${formatted}`;
  });

  // 3. 각주 자동 넘버링 및 툴팁
  window.addEventListener("DOMContentLoaded", function () {
  // 각주 처리
  const footnotes = document.querySelectorAll(".footnote");
  const container = document.getElementById("footnote-area");
  let count = 1;

  footnotes.forEach((el) => {
    const noteId = `foot${count}`;
    const refId = `ref${count}`;
    const tooltip = el.dataset.tooltip || `각주 ${count}`;

    // a태그나 sup 안 만들고 <span> 안에 바로 번호 넣음
    el.textContent = `[${count}]`;
    el.setAttribute("id", refId);
    el.setAttribute("href", `#${noteId}`);
    el.setAttribute("data-tooltip", tooltip);

    const para = document.createElement("p");
    para.setAttribute("id", noteId);
    para.innerHTML = `[${count}] ${tooltip} <a href="#${refId}">↩</a>`;
    container.appendChild(para);

    count++;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".sect, .sect2, .sect3");

  headers.forEach(header => {
    const next = header.nextElementSibling;

    // 토글 기능
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      if (!next) return;
      const isHidden = next.style.display === "none";
      next.style.display = isHidden ? "block" : "none";
    });
  });
});
