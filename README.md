# eth-checkin-proto
Ethereumを使ったチェックインアプリのプロトタイプです。

https://oss.gaiax-blockchain.com/check-in/
(MetamaskでRopstenを選択してください)

## Setup

```bash
# Setup Truffle 
$ npm i

# Setup frontend 
$ cd frontend
$ npm i
```

## build local blockchain and deploy

・Install Ganache（ https://www.trufflesuite.com/ganache ）</br>
・Launch Ganache

```bash
# deploy contracts to local blockchain
$ truffle compile
$ truffle migrare --reset
```

## Run

```bash
# launch web view
$ cd frontend
$ npm start
```

## ディレクトリの説明

・contracts: スマートコントラクトをかくSolidityのコードのためのディレクトリ</br>
・migration: ブロックチェーンにmigrateする際に必要なコードのためにディレクトリ</br>
・test: コントラクトのテストのためにディレクトリ</br>

・frontend: アプリケーションのためにディレクトリ </br>
&nbsp; &ensp;|- public:</br>
&nbsp; &ensp;|- src: </br>
&nbsp; &ensp; &emsp; |-abi: コントラクトのJSONファイルのためにディレクトリ　</br>
