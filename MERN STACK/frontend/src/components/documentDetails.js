const DocumentDetails = ({ document }) => {
    return (
        <div className="document-details">
            <h4>{document.title}</h4>
            <p><strong>Description: </strong>{document.description}</p>
            <p><strong>Author: </strong>{document.author}</p>
            <p><strong>Size (KB): </strong>{document.size}</p>
            <p>{document.createdAt}</p>
        </div>
    )
};

export default DocumentDetails