# GNSS Master



## Overview

In this tutorial we will use GNSS Master app which allows you to:

· Connect to your external GNSS receiver via USB Serial (OTG).

· Send corrections to your GNSS receiver from GNSS Master app.

· Save and record all output NMEA data logs.

In this tutorial we will use KalMix Scout Pro because it is pre-configured to send NMEA over Type-C(OTG).



## Required hardware

· KalMix Scout Pro

· Android smartphone/tablet with internet connection (make sure your device supports Bluetooth 2.0 or has USB OTG capabilities)



## Required software

· GNSS Master app (You can install it from the [Google Play Store](https://play.google.com/store/apps/details?id=com.gnssmaster))



## How to use

How to integrate external RTK receiver with Android through Mock Location?

##### **1.** Firstly, install GNSS Master app and enable mock location in your Android Device.

**This step only needs to be done once.**

(1) Install GNSS Master app on your Android device from the Google Play Store. When you first open the app, you will be asked to allow certain permissions to GNSS Master.

· Location Permission

· Display Notifications

Once you accept the permissions, the **Status** page will load, showing the current status of the app. We will configure it later.

 

(2) To enable mock locations in Android we will need to get Developer permissions. The procedure may vary slightly between different Android versions and smartphone models (you can Google your “ **Smartphone model + enable mock location **” if you can’t find the exact options).

(3) On Android 4.1 and lower, the **Developer options** screen is available by default. On Android 4.2 and higher, you must enable this screen. To enable developer options, tap the **Build Number** or **similar option** 7 times.

(4) You can find this option in one of the following locations, depending on your Android version:

**·** ***Settings –> About Phone –> Build Number***

**·** ***Settings –> System –> About Phone –> Build Number***

(5) Once you have access to Developer options, you can go to ***Settings –>Additional Settings*** and at the bottom you will find Developer options. In this big list, tap ***Select mock location app*** and select ***GNSS Master*** from the list.

(6) Connect the KalMix Scout Pro to your device, in a location with good view of the sky, or near a window for testing the functionality.

##### **2.** ***Secondly, connect the RTK receiver to your Android device.***

(1) Connect KalMix Scout with your Android device.

(2) Open GNSS Master app. Check Mock Location and Output to SW Maps.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master1.png) 

(3) Click the gear icon on the right side of ***GNSS Receiver Connection*** to enter the setup menu.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master2.png) 

(4) Choose ***USB Serial*** at Mode. Set ***Baud Rate*** to 115200 bps. At ***Connected USB Device***, it will automatically recognize your receiver with name **USB UART**.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master3.png) 

(5) Press ***CONNECT***.

(6) Go back to main menu. Now you should see in GNSS Receiver Connection it says Connected and with data transfer.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master4.png) 

(7) Open ***Correction Input*** by clicking on the gear icon.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master5.png) 

(8) In ***Mode*** choose ***NTRIP Client*** and press the ”**+**” button next to NTRIP Connections.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master6.png)  

(9) Set your NTRIP Client credentials (Caster IP, Caster Port, Username and Password). Press ***SAVE***.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master7.png)  

(10) Press ***CONNECT***. In Status you will see ***GNSS Receiver Connection*** and ***Correction Input*** showing Connected and with data communication.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master8.png)  

(11) You can check your location and available satellites in Skyplot.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master9.png)  

(12) Open your favorite GPS/GNSS application and use it as usual.

You will be using the external RTK GNSS receiver instead of the smartphone/tablet internal GPS receiver. Following image is the example of SW Maps.

![GNSS Master](/img/softwares/GNSS_Master/GNSS_Master10.png) 



