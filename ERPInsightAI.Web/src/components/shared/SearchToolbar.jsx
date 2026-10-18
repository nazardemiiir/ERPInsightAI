import { Row, Col } from "antd";

function SearchToolbar({ children }) {
    return (
        <Row
            gutter={16}
            style={{
                marginBottom: 24
            }}
        >
            {children}
        </Row>
    );
}

export default SearchToolbar;