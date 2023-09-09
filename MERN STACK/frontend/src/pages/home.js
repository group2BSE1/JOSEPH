import { useEffect, useState } from "react";

//components
import DocumentDetails from "../components/DocumentDetails";
import DocumentForm from "../components/DocumentForm";

const Home = () => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch("/api/documents");
      const json = await response.json();

      if (response.ok) {
        setDocuments(json);
      }
    };

    fetchDocuments();
  }, []);

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
