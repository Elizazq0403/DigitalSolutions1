import { useParams, Navigate } from "react-router-dom";

const RedirectToPerfil = () => {
  const { slug } = useParams();
  return <Navigate to={`/${slug}/perfil`} replace />;
};

export default RedirectToPerfil;