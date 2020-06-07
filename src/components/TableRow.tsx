import { Maybe } from "generated/graphql";


type TableRowProps = {
  code?: string
  loading?: boolean
  name?: string
}

export default ({ code, loading, name }: TableRowProps) => (
  <div className="table table-row">
    <p className={loading ? "loading" : ""}>{code}</p> <p>{name}</p>
  </div>
);
