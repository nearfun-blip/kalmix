---
sidebar_position: 1
toc_max_heading_level: 3
---

# NTRIP Client APP(Andriod)





### NTRIP Client  (Android APP)

In this tutorial we will explain how to configure[ KalMix RTK receivers](https://www.ardusimple.com/professional-sets/) to be used as Mock location for Android smartphones/tablets in order to get centimeter position accuracy.

If you are not familiar with the term, mock location means that you cheat your Android device to use an external GNSS receiver as if it was its own internal one. This has the advantage that any GPS/GNSS app that works with your Android device can benefit of centimeter level accuracy.

In this tutorial we will use IOTARS app which allows you to:

· Connect to your external GNSS receiver via USB Serial (OTG).

· Send corrections to your GNSS receiver from IOTARS app.

· Save and record all output NMEA data logs.

In this tutorial we will use KalMix Scout because it is pre-configured to send NMEA over Type-C(OTG).

### ***\*Required hardware:\****

· KalMix Scout

· Android smartphone/tablet with internet connection (make sure your device supports Bluetooth 2.0 or has USB OTG capabilities)

### ***\*Required software:\****

· IOTARS app (You can contact us to get it.)

### ***\*使用方法

(1) 安装IOTARS app。

![APP](/img/app-logo.png)



![img](file:///C:\Users\vrobo\AppData\Local\Temp\ksohtml31792\wps1.png) 

(2) 将KalMix Scout插入android手机的Type-C接口。

(3) 打开IOTARS APP软件：

![img](file:///C:\Users\vrobo\AppData\Local\Temp\ksohtml31792\wps2.png) 

 

(4) 界面顶端选择“设备类型”为“USB设备”：

![img](file:///C:\Users\vrobo\AppData\Local\Temp\ksohtml31792\wps3.png) 

(5) 设置差分服务器和账号后，

(6) 点击“开始”按钮

l 等待终端定位后，即可读取到终端的GGA数据。

![img](file:///C:\Users\vrobo\AppData\Local\Temp\ksohtml31792\wps4.png) 

l 如成功连接差分服务后，界面底部将实时更新差分数据流信息。

l 等待一段时间后，如设备能进入RTK状态，则GGA信息将显示为绿色。（如进入浮动解或固定解状态时。

 ![img](file:///C:\Users\vrobo\AppData\Local\Temp\ksohtml31792\wps5.png)

 

 

***\*
\****