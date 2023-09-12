import { useEffect } from "react";
import { useDocumentsContext } from "../hooks/useDocumentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import DocumentDetails from "../components/DocumentDetails";
import DocumentForm from "../components/DocumentForm";

const Home = () => {
  const { documents, dispatch } = useDocumentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch("/api/documents", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_DOCUMENTS", payload: json });
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="documents">
        {documents &&
          documents.map((document) => (
            <DocumentDetails key={document._id} document={document} />
          ))}
      </div>
      {/* <DocumentForm /> */}
    </div>
  );
};

export default Home;
