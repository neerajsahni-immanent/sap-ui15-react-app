import { Card, CardHeader, Icon, Input, Text } from "@ui5/webcomponents-react";
// import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";

// const dataset = [
//     {
//         month: "January",
//         data: 65,
//     },
//     {
//         month: "February",
//         data: 59,
//     },
//     {
//         month: "March",
//         data: 80,
//     },
//     {
//         month: "April",
//         data: 81,
//     },
//     {
//         month: "May",
//         data: 56,
//     },
//     {
//         month: "June",
//         data: 55,
//     },
//     {
//         month: "July",
//         data: 40,
//     },
// ];

export function MyApp() {
    const handleHeaderClick = () => {
        alert("Header clicked");
    };
    return (
        <div>
            <Card
                header={
                    <CardHeader
                        titleText="Card"
                        interactive
                        onClick={handleHeaderClick}
                    />
                }
                // style={{ width: "300px" }}
            >
                <Text style={{ padding: "var(--sapContent_Space_S)" }}>
                    This is the content area of the Card
                </Text>
                {/* <LineChart
          dimensions={[{ accessor: "month" }]}
          measures={[{ accessor: "data", label: "Price" }]}
          dataset={dataset}
        />
        <BarChart
          dimensions={[{ accessor: "month" }]}
          measures={[{ accessor: "data", label: "Price" }]}
          dataset={dataset}
        /> */}
                <Input
                    icon={<Icon name="employee" />}
                    onChange={function Xne() { }}
                    onClose={function Xne() { }}
                    onInput={function Xne() { }}
                    onOpen={function Xne() { }}
                    onSelect={function Xne() { }}
                    onSelectionChange={function Xne() { }}
                    type="Text"
                    valueState="None"
                />
                <Input
                    icon={<Icon name="key" />}
                    onChange={function Xne() { }}
                    onClose={function Xne() { }}
                    onInput={function Xne() { }}
                    onOpen={function Xne() { }}
                    onSelect={function Xne() { }}
                    onSelectionChange={function Xne() { }}
                    type="Password"
                    valueState="None"
                />
            </Card>
        </div>
    );
}
