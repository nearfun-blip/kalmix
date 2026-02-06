# NTRIP Client



In this tutorial we will explain how to configure [KalMix Scout Pro](https://www.kalmixtech.com/products/kalmix™-scout-pro) to be used as Mock location for computer or Android smartphones/tablets in order to get centimeter position accuracy.



## NTRIP Client  (Android APP)

<details>
<summary>APP User Guide</summary>



If you are not familiar with the term, mock location means that you cheat your Android device to use an external GNSS receiver as if it was its own internal one. This has the advantage that any GPS/GNSS app that works with your Android device can benefit of centimeter level accuracy.

In this tutorial we will use IOTARS app which allows you to:

· Connect to your external GNSS receiver via USB Serial (OTG).

· Send corrections to your GNSS receiver from IOTARS app.

· Save and record all output NMEA data logs.

In this tutorial we will use KalMix Scout because it is pre-configured to send NMEA over Type-C(OTG).

### Required hardware:

· [KalMix Scout Pro](https://www.kalmixtech.com/products/kalmix™-scout-pro) 

· Android smartphone/tablet with internet connection (make sure your device has USB OTG capabilities)

### Required software:

· IOTARS app (You can contact us to get it.)

### How to Use?

#### Step 1: Install IOTARS App

Download and install the IOTARS application.

![APP](/img/NTRIP_Client_APP/app-logo.png)

#### Step 2: Connect Device

Insert the **KalMix Scout Pro**  into your Android phone's **Type-C port**.

:::tip Tip
Ensure the device is properly connected. Your phone will prompt that a USB device has been detected.
:::

#### Step 3: Open Application

Launch the **IOTARS App**.

![APP2](/img/NTRIP_Client_APP/app2.png)

#### Step 4: Select Device Type

In the "**Device Type**" dropdown menu at the top of the interface, select **"USB Device"**.

![APP3](/img/NTRIP_Client_APP/app3.png)

#### Step 5: Configure Differential Service

Set the following parameters:
- **Differential Server Address** (Address、Port、MountPoint)
- **Account Information** (Username and Password)

#### Step 6: Start Positioning

Click the **"Start"** button.

After the terminal completes positioning, the application will read and display the terminal's **GGA data**.

![APP4](/img/NTRIP_Client_APP/app4.png)

---

### Status Indicators

#### Differential Connection Status

After successfully connecting to the differential service, the **differential data stream information** will be updated in real-time at the bottom of the interface.

#### RTK Positioning Status

After waiting for a period of time, if the device successfully enters **RTK differential positioning mode**, the GGA information will be displayed in **green**.

Possible states include:
- ✅ **Float Solution**
- ✅ **Fixed Solution**

:::success Positioning Successful
When the GGA information is displayed in green, the device has achieved centimeter-level positioning accuracy.
:::

---

### Frequently Asked Questions

<details>
<summary>❓ What if GGA data is not displayed?</summary>

Please check:
1. Is KalMix Scout Pro properly connected?
2. Is the device type set to "USB Device"?
3. Is the differential server configuration correct?

</details>



<details>
<summary>❓ Unable to achieve Fixed solution for extended period</summary>

Possible reasons:
- Poor signal environment (obstruction, multipath interference)
- Poor differential data quality
- Base station too far away

Recommendation: Move to an open area and retry.

</details>



</details>





## NTRIP Client  (Windows)

<details>
<summary>User Guide</summary>

Various NTRIP Client tools are available for Windows environments. You can use your own tools or third-party applications. This guide demonstrates using the third-party open-source tool **Lefebure NTRIP Client** as an example.

### Required Hardware:

- [KalMix Scout Pro](https://www.kalmixtech.com/products/kalmix™-scout-pro) 

### Required Software:
- Lefebure NTRIP Client  
  (You can download from: https://www.lefebure.com/software/ntripclient/)

---

### Setup Instructions

#### Step 1: Download Software

Download the Lefebure NTRIP Client installer to your Windows computer.

![win0](/img/NTRIP_Client_Win/win0.png)

#### Step 2: Connect Device

Insert the **KalMix Scout Pro**'s Type-C interface into your computer.

:::tip USB Compatibility
If your computer only has USB ports (no Type-C), use a USB to Type-C adapter.
:::

#### Step 3: Launch Application

Double-click to run the **"NTRIPClient.exe"** file.

![win1](/img/NTRIP_Client_Win/win1.png)

#### Step 4: Configure Serial Port

1. Click the **"Edit"** button next to "Serial Port"

2. Select the COM port corresponding to your connected KalMix Scout terminal

   ![win2](/img/NTRIP_Client_Win/win2.png)

**Example:** COM18

#### Step 5: Set Communication Parameters

Configure the following settings, then click **"OK"**:

| Parameter     | Value                         |
| ------------- | ----------------------------- |
| Baud Rate     | 115200                        |
| Data Bits     | 8                             |
| Receiver Type | Don't Automatically Configure |

#### Step 6: Connect to Terminal

Click the **"Connect"** button next to "Serial Port".

If the terminal connects successfully, wait for positioning to complete. You will see positioning status and satellite count in the interface.

![win3](/img/NTRIP_Client_Win/win3.png)

**Example display:** `DGPS:23`

#### Step 7: Open NTRIP Settings

Click the **"Edit"** button next to "NTRIP Stream".

![win4](/img/NTRIP_Client_Win/win4.png)

#### Step 8: Configure Differential Service

Set the following parameters:

| Field         | Description                                      |
| ------------- | ------------------------------------------------ |
| Address       | NTRIP server address                             |
| Port          | Server port number                               |
| Username      | Your account username                            |
| Password      | Your account password                            |
| Your Location | **Use Position data from Serial Port** (default) |

Click **"OK"** when complete.

![win5](/img/NTRIP_Client_Win/win5.png)

#### Step 9: Connect to NTRIP Service

Click the **"Connect"** button next to "NTRIP Stream".

After successful NTRIP account connection, wait a moment for the terminal to enter **RTK mode**.

---

### Status Verification

#### Connection Indicators

- **Serial Port Connected**: Device information and satellite count displayed
- **NTRIP Connected**: Differential data stream active
- **RTK Mode Achieved**: Terminal reaches centimeter-level accuracy

#### Expected Results

When properly configured:
1. Terminal receives GNSS signals (DGPS mode)
2. Differential corrections received from NTRIP Caster
3. Terminal enters RTK Float or Fixed solution

:::success RTK Status Achieved
Once the terminal displays RTK status, your KalMix Scout is providing centimeter-level positioning accuracy.
:::

---

### Troubleshooting

<details>
<summary>❓ COM port not detected</summary>

**Solutions:**
- Ensure KalMix Scout is properly connected
- Check if drivers are installed correctly
- Try a different USB port or cable
- Verify device appears in Windows Device Manager

</details>

<details>
<summary>❓ Cannot connect to NTRIP server</summary>

**Check the following:**
1. Verify server address and port are correct
2. Confirm username and password are valid
3. Check internet connection
4. Ensure firewall is not blocking the connection

</details>

<details>
<summary>❓ Terminal not entering RTK mode</summary>

**Possible causes:**
- Insufficient satellite visibility
- Poor GNSS signal environment
- Base station too far from rover
- Incorrect mountpoint selection

**Recommendations:**
- Move to an open-sky location
- Wait longer for convergence (2-5 minutes)
- Verify NTRIP stream is transmitting corrections

</details>

---

### Alternative Windows NTRIP Clients

Other compatible Windows NTRIP client software includes:
- **STRSVR** (from RTKLIB)
- **BKG Ntrip Client (BNC)**
- **SNIP Lite**
- Custom proprietary solutions

All these tools can work with KalMix Scout Pro using similar configuration steps.



</details>
