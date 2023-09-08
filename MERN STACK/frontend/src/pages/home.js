import { useEffect, useState } from "react";

//components
import documentDetails from "../components/documentDetails";

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
            <documentDetails key={document._id} document={document} />
          ))}
      </div>
    </div>
  );
};

export default Home;
