import {Spin} from "antd";
import "./Preloader.sass"

export const Preloader = ({isLoading, children}) => {
  return (
    <>
    {isLoading ? (
      <div className="preloader">
        <Spin size="large" />
        <h2>Loading</h2>
      </div>
    ) : (
      children
    )}
    </>
  )
}