

export default (req, res) => {
    return res.status(200).json(currentExpenses);
}


const currentExpenses = [
    {name: 'Luz'        , amount:'500',   paid: true},
    {name: 'Gas'        , amount:'20',    paid:true},
    {name: 'ABL'        , amount:'3500',  paid: false},
    {name: 'Expensas'   , amount:'210',   paid: false},
    {name: 'televisor'  , amount:'842',   paid: false},
    {name: 'expense 6'  , amount:'632',   paid: false},
    {name: 'expense 7'  , amount:'99',    paid: false},
]