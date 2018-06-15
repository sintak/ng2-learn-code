import 'dart:io';
import 'package:dio/dio.dart';
import 'privateData.dart' as privateData;

testDio1() async {  
  Dio dio = new Dio(); // 使用默认配置

  // 配置dio实例
  dio.options.baseUrl="http://www.baidu.com/";
  dio.options.connectTimeout = 5000; //5s
  dio.options.receiveTimeout=3000;  

  try {
        
    Response response = await dio.get('/s', data: {'wd': 'hello'});
    print(response.data);
   } on DioError catch(e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and is also not 304.
      if(e.response != null) {
        print(e.response.data);
        print(e.response.headers) ;
        print(e.response.request)   ; 
      } else{
        // Something happened in setting up or sending the request that triggered an Error  
        // print(e.request)  ;
        print(e.message);
      }  
  }
}

testDio2() async {

  var dio = new Dio(new Options(
      baseUrl: "http://www.dtworkroom.com/doris/1/2.0.0/",
      connectTimeout: 5000,
      receiveTimeout: 100000,
      // 5s
      headers: {
        "user-agent": "dio",
        "api": "1.0.0"
      },
      contentType: ContentType.JSON,
      // Transform the response data to a String encoded with UTF8.
      // The default value is [ResponseType.JSON].
      responseType: ResponseType.PLAIN
  ));

  Response response;

  response = await dio.get("/test");
  print(response.data);

  Response  responseMap = await dio.get("/test",
    // Transform response data to Json Map
    options: new Options(responseType: ResponseType.JSON),
  );
  print(responseMap.data);

  response = await dio.post("/test",
    data: {
      "id": 8,
      "info": {
        "name": "wendux",
        "age": 25
      }
    },
    // Send data with "application/x-www-form-urlencoded" format
    options: new Options(
        contentType: ContentType.parse("application/x-www-form-urlencoded")),
  );
  print(response.data);
}

getRuby() async {
  var dio = new Dio(new Options(
      baseUrl: "http://jlp.yahooapis.jp/",
      connectTimeout: 5000,
      receiveTimeout: 10000,
      // 5s
      headers: {
        "user-agent": "dio",
        "api": "1.0.0"
      },
      contentType: ContentType.JSON,
      // Transform the response data to a String encoded with UTF8.
      // The default value is [ResponseType.JSON].
      responseType: ResponseType.PLAIN
  ));

  try {        
    Response response = await dio.get("/FuriganaService/V1/furigana", data: {'appid': 'dj00aiZpPWhPS0tSYnE2MklweiZzPWNvbnN1bWVyc2VjcmV0Jng9MGU-', 
      'sentence': '貴方が好きだ'});
    print(response.data);
   } on DioError catch(e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and is also not 304.
      if(e.response != null) {
        print(e.response.data);
        print(e.response.headers) ;
        print(e.response.request)   ; 
      } else{
        // Something happened in setting up or sending the request that triggered an Error  
        // print(e.request)  ;
        print(e.message);
      }  
  }
}

getMA() async {
  var dio = new Dio(new Options(
      baseUrl: "https://jlp.yahooapis.jp/",
      connectTimeout: 5000,
      receiveTimeout: 10000,
      // 5s
      headers: {
        "user-agent": "dio",
        "api": "1.0.0"
      },
      contentType: ContentType.JSON,
      // Transform the response data to a String encoded with UTF8.
      // The default value is [ResponseType.JSON].
      responseType: ResponseType.PLAIN
  ));

  try {        
    Response response = await dio.get("/MAService/V1/parse", data: {'appid': privateData.key, 
      'sentence': '貴方のことを忘れたくない。貴方がすきだ。あなた', 'results': 'ma,uniq', 'response': 'surface,reading,pos,baseform,feature'});
    print(response.data);
   } on DioError catch(e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and is also not 304.
      if(e.response != null) {
        print(e.response.data);
        print(e.response.headers) ;
        print(e.response.request)   ; 
      } else{
        // Something happened in setting up or sending the request that triggered an Error  
        // print(e.request)  ;
        print(e.message);
      }  
  }
}

main() async {
  // testDio1();
  getRuby();
  getMA();
}