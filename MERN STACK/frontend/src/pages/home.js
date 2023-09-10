import { useEffect } from "react";
import { useDocumentsContext } from "../hooks/useDocumentsContext";

//components
import DocumentDetails from "../components/DocumentDetails";
import DocumentForm from "../components/DocumentForm";

const Home = () => {
  const { documents, dispatch } = useDocumentsContext();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch("/api/documents");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_DOCUMENTS", payload: json });
      }
    };

    fetchDocuments();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="documents">
        {documents &&
          documents.map((document) => (
            <DocumentDetails key={document._id} document={document} />
          ))}
      </div>
      <DocumentForm />
    </div>
  );
};

export default Home;
