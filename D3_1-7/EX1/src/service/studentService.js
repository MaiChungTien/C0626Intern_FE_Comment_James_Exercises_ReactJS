const Students = [
  {
    ID: '1',
    Name: 'Maria Anders',
    Age: '18',
    Address: 'Germany'
  },
  {
    ID: '2',
    Name: 'Francisco Chang',
    Age: '25',
    Address: 'Mexico'
  },
  {
    ID: '3',
    Name: 'Roland Mendel',
    Age: '30',
    Address: 'Austria'
  },
  {
    ID: '4',
    Name: 'Helen Bennett',
    Age: '22',
    Address: 'UK'
  },
  {
    ID: '5',
    Name: 'Yoshi Tannamuri',
    Age: '28',
    Address: 'Canada'
  },
  {
    ID: '6',
    Name: 'Giovanni Rovelli',
    Age: '35',
    Address: 'Italy'
  }
]

export function getAll() {
    //Call API
    return Students;
}

