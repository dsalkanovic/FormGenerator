import React from 'react';
import NavigatorPage from './components/page';
import NavigatorGroup from './components/group';
import NavigatorField from './components/field';

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getRandomArray = () => {
        const num = Math.round(Math.random() * 10);
        return Array.apply(null, { length: num }).map(Number.call, Number);
    };

    render() {
        return (
            <div className="configurator-navigator">
                <NavigatorPage name={'Page 1'}>
                    {this.getRandomArray().map(g => (
                        <NavigatorGroup key={g} name={`Group ${g}`}>
                            {this.getRandomArray().map(f => (
                                <NavigatorField key={f} name={`Field Name ${f}`} />
                            ))}
                        </NavigatorGroup>
                    ))}
                </NavigatorPage>
            </div>
        );
    }
}

export default Navigator;
