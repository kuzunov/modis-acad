import { isRouteErrorResponse, useRouteError } from "react-router-dom";
type ER = {
    statusText:string;
    message:string;
}
export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);
  isRouteErrorResponse(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}