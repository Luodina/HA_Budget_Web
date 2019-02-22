export default {
    items: [{
            title: true,
            icon: 'icon-star',
            name: 'Applications',
            wrapper: { // optional wrapper object
                element: '', // required valid HTML5 element tag
                attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: '' // optional class names space delimited list for title item ex: "text-center"
        },
        // {
        //     name: 'Cluster',
        //     url: '/cluster',
        //     icon: 'icon-puzzle',
        //     children: [{
        //         name: 'Input Form',
        //         url: '/cluster/input',
        //         icon: 'icon-puzzle',
        //     }, ],
        // },
        {
            name: 'BUDGET',
            url: '/buttons',
            icon: 'icon-layers',
            children: [{
                    name: 'Government Level',
                    url: '/buttons/buttons',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Corporate Level',
                    url: '/buttons/button-dropdowns',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Cluster Level',
                    url: '/buttons/buttons',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Capital Budget',
                    url: '/buttons/button-dropdowns',
                    icon: 'icon-cursor',
                    children: []
                },
                {
                    name: 'ITBV Budget',
                    url: '/buttons/buttons',
                    icon: 'icon-cursor',
                    children: []
                },
                {
                    name: 'Transaction Key',
                    url: '/buttons/button-dropdowns',
                    icon: 'icon-cursor',
                }
            ],
        },
        {
            name: 'CAPITAL',
            url: '/buttons',
            icon: 'icon-layers',
            children: []
        },
        {
            name: 'FUND_01',
            url: '/buttons',
            icon: 'icon-layers',
            children: []
        },
        {
            name: 'FUND_03',
            url: '/buttons',
            icon: 'icon-layers',
            children: []
        },
        {
            name: 'PE_INPUT',
            url: '/buttons',
            icon: 'icon-layers',
            children: []
        },
        {
            name: 'WI_INPUT',
            url: '/buttons',
            icon: 'icon-layers',
            children: []
        },
    ],
};