# 오늘은 뭐먹지?

## 사용 프로그램
npm, react, scss, API

## 간략 설명

공공데이터 > 농촌진흥청 국립원예특작과학원_원예특용작물 요리 조회 서비스 API를 활용한 레시피 어플\
제작기간  9/12 ~ 10/2\
최대 지원 폭은 780px  API내용의 검색기능을 주로 다룸\
핸드폰 자체기능인 뒤로가기, 엔터가 있는 키보드연동 등은 구현되지 않았으며 추후 배우게되면 추가예정 \

## 트러블

### `axios 오류`
API 데이터가 처음에 안불러져서 선생님을 부르게 되었는데\
이유는 모르겠는데 (아마도 오류같음)\
  const instans = axios.create({
    baseURL: 'https://apis.data.go.kr/1390804/NihhsRdaLifeInfo',
    params:{key:serviceKey=xBEICBrNP80hSWFRTlYIa8RIgTZQBuFgyMr3iyCelmwoIPnrkfqTo0lJpjt6vII2mqwxn%2F6L5M30RNmxVOaO%2Fw%3D%3D&numOfRows=15}
  })

  의 params 부분이 주소뒤에 계속 안붙어줘서 그냥 수동으로 붙였음  >> instans.get(food_type[0] + key + page + search)
                                                                .then(=>)

### `API 데이터가 통짜...`
데이터 내용이조금더 통일되어있으면 디테일페이지를 조금더 원하는대로 디자인할수 있엇을것같은데 다 붙어있어서 구분하는것이 최선이였음


### `꾸욱버튼`
mod가 false 일경우 버튼을 누르고있는 시간을 감지해서 setmod 값을 true로 변경\
mod가 true 일경우 true 유지\
종료버튼을누르거나 화면을 나갈때 mod값을 false로 변경

마우스 up down 만 사용해서 조절하려니까 계속 오류나서 결국에 down에 if문으로 위에 문구를 넣어서 작동시킴


### `sticky`
overFlow : hidden 만 했다하면 사라짐, 작업하는동안 fixed 때문에 종종 집어넣었었는데 화면에 꽉찰때는 fixed가 잘작동하다가 max치가 넘어가도 윈도우창에 붙어 있어서\
결국에는 다수정하고 네비 서브창까지 다시만듬 마찬가지로 전체div에 hidden을 넣을수 없어서 따로 hw 만들어서 커졋다 줄어들었다 하게 만듬\
jqery 썻으면 편했겟다싶엇지만 두가지 섞어서 쓰면 했갈릴수 있다고해서 최대한 html만 사용했음
 

### `디자인이구림`
나는 디자인 센스가없는거같음 어찌저찌 주황색은 잘골라서 갓는데 디자인이 진자 무슨 css 박살난 사이트 처럼 밖에 안나와서 매우 괴로웠음


### `그외`
추후 데이터 베이스 넣어볼 예정, 로그인기능이 필요한가? 에대한 의문이 약간 있음 (냉장고 내용물을 공유할것도 아니고 폰 자체에 저장하는편이 낫지않을까) 

<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
