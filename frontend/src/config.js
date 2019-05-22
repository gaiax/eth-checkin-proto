export const PLACE_LIST_ADDRESS = '0x2138cb6ef57135da9b0bbba65c7f612fca2e93ab'

export const PLACE_LIST_ABI =  [{"constant":true,"inputs":[],"name":"checkinCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"placeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"places","outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"ipfsHash","type":"string"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_id","type":"uint256"},{"indexed":true,"name":"_owner","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_ipfsHash","type":"string"},{"indexed":false,"name":"_latitude","type":"string"},{"indexed":false,"name":"_longitude","type":"string"}],"name":"CreatePlace","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_placeid","type":"uint256"},{"indexed":false,"name":"_user","type":"address"},{"indexed":false,"name":"_checkintime","type":"uint256"},{"indexed":false,"name":"_latitude","type":"string"},{"indexed":false,"name":"_longitude","type":"string"}],"name":"CheckIn","type":"event"},{"constant":true,"inputs":[{"name":"_from","type":"address"}],"name":"getAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_ipfsHash","type":"string"},{"name":"_latitude","type":"string"},{"name":"_longitude","type":"string"}],"name":"createPlace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"placeid","type":"uint256"},{"name":"_latitude","type":"string"},{"name":"_longitude","type":"string"}],"name":"userCheckIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfCheckin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfPlace","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_user","type":"address"}],"name":"getCheckinListForUser","outputs":[{"components":[{"name":"placeid","type":"uint256"},{"name":"user","type":"address"},{"name":"checkintime","type":"uint256"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_placeid","type":"uint256"}],"name":"getCheckinListForOwner","outputs":[{"components":[{"name":"placeid","type":"uint256"},{"name":"user","type":"address"},{"name":"checkintime","type":"uint256"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_user","type":"address"}],"name":"getAllCheckinList","outputs":[{"components":[{"name":"placeid","type":"uint256"},{"name":"user","type":"address"},{"name":"checkintime","type":"uint256"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_placeid","type":"uint256"}],"name":"getNumberOfVisiters","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]