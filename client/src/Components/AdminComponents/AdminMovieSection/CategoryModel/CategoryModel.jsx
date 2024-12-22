function CategoryModel({categoryModalRef,modelTitle,handleCategoryFormSubmit,method,handleChange,buttonClass,id,formBody,url}) {
    return(
        <div className="CategoryModel">
            <div className="addCategoryModal">
                <div
                    className="modal fade"
                    id={id}
                    tabIndex="-1"
                    aria-labelledby="addCategoryLabel"
                    aria-hidden="true"
                    ref={categoryModalRef}
                >
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addCategoryLabel">{modelTitle}</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    className="row g-3 needs-validation2"
                                    noValidate
                                    onSubmit={(event) => handleCategoryFormSubmit(event, ".needs-validation2", url, method)}
                                >
                                    {formBody}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className={`btn btn-${buttonClass}`}>
                                            {modelTitle}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryModel;