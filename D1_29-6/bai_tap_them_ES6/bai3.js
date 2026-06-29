// Viết một function có tham số là một đối tượng bất kỳ . 
// Function sẽ hiển thi ra 2 thuộc tính firstName và degree
//  Nếu đối tượng truyền vào không có thuộc tính firstName thì firstNam có giá trị mặc định là "Quân", tương tự với degree là "NA"
const getInfo = ({
                    firstName = 'Quân',
                    degree = 'NA'
                } = {}) => {
    console.log(firstName);
    console.log(degree);
}

const sv1={
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
}

getInfo(sv1);


const sv2={
    name: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
}

getInfo(sv2);