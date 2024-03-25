import icons from "url:../../img/icons.svg";
import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addClickHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      e.preventDefault();
      handler(btn);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Scenario 1: we are on page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      //   console.log("Scenario 1: we are on page 1 and there are other pagess");
      return `
        <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }
    // Scenario 2: we are on the last page
    if (currentPage === numPages) {
      //   console.log("Scenario 2: we are on the last page");
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }

    // Scenario 3: we are on an intermediate page
    if (currentPage > 1 && currentPage < numPages) {
      //   console.log("Scenario 3: we are on an intermediate page");
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // Scenario 4: we are on page 1 and there are NO other pages
    // console.log("Scenario 4: we are on page 1 and there are NO other pages");
    return "";
  }
}

export default new PaginationView();
