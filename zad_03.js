const axios = require("axios");

const checkTime = (funTab) => {

    const arr = [];
    const times = [];
    let i = 1;

    console.log("Start");
    const interval = setInterval(
        () => {
            console.log(i)
            

            
            if (arr.length == 1 && times.length!=1){
                times.push(i)
                console.log(`Zakończono działanie: scenariusz ${arr[0]})`)
            }

            else if (arr.length == 2){
                
                if (times.length == 0){
                    times.push(i)
                    console.log(`Zakończono działanie: scenariusz ${arr[0]})`)
                }

                console.log(`Zakończono działanie: scenariusz ${arr[1]})`)
                times.push(i)

                console.log("Koniec")
                console.log(`Czas działania ${times}`)
                clearInterval(interval)         

            }

            i+=1;
            
        }
        ,1000)

    funTab.reduce((acc,c) => {
        return acc.then(newAcc => {
            return c().then(res => {
                return [...newAcc,res]
            })
        })
    },Promise.resolve([]))
    .then(res => {
        arr.push("a")
    })


    Promise.all(funTab.reduce((acc,c) => {
        return [...acc,c()]
    },[]))
    .then(res => arr.push("b"))


}


const f1 = () => axios.get("https://jsonplaceholder.typicode.com/photos")
const f2 = () => axios.post("https://jsonplaceholder.typicode.com/posts")
const f3 = () => axios.get("https://jsonplaceholder.typicode.com/users/3")
const f4 = () => axios.get("https://jsonplaceholder.typicode.com/todos")
const f5 = () => axios.put("https://jsonplaceholder.typicode.com/posts/7",{
    id: 7,
    userId: 3,
    title: 'New title',
    body: 'New body'
})

const tab = [f1,f2,f3,f4,f5]

// Dla testu
// const t = () => new Promise((res) => {
//     setTimeout(() => {
//         res(5)
//     }, 2000);
// })
// const tab = [t,t,t,t,t]

checkTime(tab)
