---

sidebar_position: 1
---



# RTCM 3.X Protocol



## Overview

**RTCM SC-104** (Radio Technical Commission for Maritime Services, Special Committee 104) defines the standard format for transmitting **GNSS differential correction data**. It is the foundation of all modern **RTK (Real-Time Kinematic)** and **DGPS (Differential GPS)** positioning systems.

Unlike [NMEA 0183](./NMEA0183_Protocol.md) which uses human-readable ASCII text, RTCM 3.x uses a **compact binary format** designed for efficient data transmission.

| Item                  | Specification                        |
| --------------------- | ------------------------------------ |
| **Standard**          | RTCM Standard 10403.x                |
| **Current Version**   | RTCM 3.3 (with amendments)           |
| **Data Format**       | Binary                               |
| **Transport**         | Serial / NTRIP / TCP/IP / Radio Link |
| **Typical Data Rate** | 500 bps – 9600 bps                   |
| **Primary Use**       | RTK, DGPS, PPP corrections           |

:::info RTCM 2.x vs 3.x
RTCM **2.x** is the older version, still found in some legacy systems. RTCM **3.x** is the current standard and offers:
- More compact encoding (30–50% smaller)
- Support for multi-constellation (GPS, GLONASS, Galileo, BeiDou)
- MSM (Multiple Signal Messages) for modern signals
- Network RTK support (VRS, FKP, MAC)

**All modern GNSS equipment uses RTCM 3.x.** This document focuses on RTCM 3.x only.
:::



## How RTK Works with RTCM

```
┌──────────────┐         RTCM 3.x Corrections         ┌──────────────┐
│              │  ─────────────────────────────────────▶│              │
│  Base Station│    (Radio / NTRIP / Serial)            │    Rover     │
│   (Known     │                                       │  (Unknown    │
│  Position)   │                                       │  Position)   │
│              │                                       │              │
│  GNSS Antenna│                                       │ GNSS Antenna │
│      ▲       │                                       │      ▲       │
└──────┼───────┘                                       └──────┼───────┘
       │                                                      │
       │            GNSS Satellite Signals                    │
       └──────────────────┬───────────────────────────────────┘
                          │
                    ┌─────┴─────┐
                    │ ◉ ◉ ◉ ◉ ◉│  GNSS Satellites
                    └───────────┘
```

1. **Base Station** observes satellites from a known position and generates correction data.
2. Corrections are encoded as **RTCM 3.x messages** and transmitted to the rover.
3. **Rover** applies corrections to its own observations and computes a high-precision position.

| Solution Type | Accuracy   | Requires                                       |
| ------------- | ---------- | ---------------------------------------------- |
| Autonomous    | 2–5 m      | No corrections                                 |
| DGPS          | 0.5–1 m    | RTCM code corrections                          |
| RTK Float     | 20–50 cm   | RTCM carrier-phase data                        |
| RTK Fixed     | **1–2 cm** | RTCM carrier-phase data + ambiguity resolution |
| PPP           | 5–30 cm    | RTCM SSR corrections                           |



## Frame Structure

Every RTCM 3.x message is wrapped in a binary frame:

```
┌──────────┬────────────┬──────────────────────────┬──────────┐
│ Preamble │   Length   │       Message Data       │   CRC    │
│  1 byte  │  2 bytes   │    Variable (0–1023)     │  3 bytes │
│   0xD3   │ 10bit len  │                          │ CRC-24Q  │
└──────────┴────────────┴──────────────────────────┴──────────┘
```

| Part             | Size     | Description                                                |
| ---------------- | -------- | ---------------------------------------------------------- |
| **Preamble**     | 1 byte   | Always `0xD3` — used for frame synchronization             |
| **Reserved**     | 6 bits   | Reserved, set to `000000`                                  |
| **Length**       | 10 bits  | Length of the Message Data in bytes (0–1023)               |
| **Message Data** | Variable | Contains Message Type (12 bits) + message-specific payload |
| **CRC-24Q**      | 3 bytes  | 24-bit Qualcomm CRC over Preamble + Length + Message Data  |

:::note
The first **12 bits** of the Message Data always contain the **Message Type Number** (e.g., 1005, 1077, 1230), which identifies the content of the message.
:::

### CRC-24Q Verification

RTCM 3.x uses **CRC-24Q** (polynomial: `0x1864CFB`) to verify data integrity. Every compliant receiver will discard frames with invalid CRC.



## Common Message Types

### Observation Messages (Legacy)

Legacy observation messages — per constellation, single-frequency/dual-frequency:

| Message Type | Description                                    |
| ------------ | ---------------------------------------------- |
| 1001         | GPS L1 code observations                       |
| 1002         | GPS L1 code + phase observations (extended)    |
| 1003         | GPS L1/L2 code observations                    |
| 1004         | GPS L1/L2 code + phase observations (extended) |
| 1009         | GLONASS L1 code observations                   |
| 1010         | GLONASS L1 code + phase observations           |
| 1011         | GLONASS L1/L2 code observations                |
| 1012         | GLONASS L1/L2 code + phase observations        |

:::caution Legacy Messages
Messages 1001–1004 and 1009–1012 are **legacy formats** that only support GPS and GLONASS. For multi-constellation and multi-frequency support, use **MSM messages** (see below).
:::



### MSM — Multiple Signal Messages (Recommended ✅)

MSM is the modern approach introduced in RTCM 3.3. It supports **all constellations** and **all signal types** in a unified format.

#### MSM Type Levels

| MSM Level | Content                                      | Typical Use          |
| --------- | -------------------------------------------- | -------------------- |
| MSM1      | Compact code (pseudorange)                   | Low bandwidth        |
| MSM2      | Compact phase                                | Rare                 |
| MSM3      | Compact code + phase                         | Rare                 |
| MSM4      | Full code + phase with CNR                   | **DGPS / Basic RTK** |
| MSM5      | Full code + phase + Doppler + CNR (extended) | **Recommended**      |
| MSM6      | High-resolution code + phase with CNR        | High precision       |
| MSM7      | High-resolution code + phase + Doppler + CNR | **Best quality RTK** |

:::tip MSM4 vs MSM5 vs MSM7
- **MSM4**: Good balance of data size and content, suitable for most applications.
- **MSM5**: Adds Doppler and extended info to MSM4, widely recommended for RTK.
- **MSM7**: Highest resolution, best for scientific or high-precision applications, but larger data size.

For most RTK applications, **MSM4 or MSM5** is the optimal choice.
:::

#### MSM Message Numbers by Constellation

| Constellation | MSM1 | MSM2 | MSM3 | MSM4 | MSM5 | MSM6 | MSM7 |
| ------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| **GPS**       | 1071 | 1072 | 1073 | 1074 | 1075 | 1076 | 1077 |
| **GLONASS**   | 1081 | 1082 | 1083 | 1084 | 1085 | 1086 | 1087 |
| **Galileo**   | 1091 | 1092 | 1093 | 1094 | 1095 | 1096 | 1097 |
| **SBAS**      | 1101 | 1102 | 1103 | 1104 | 1105 | 1106 | 1107 |
| **QZSS**      | 1111 | 1112 | 1113 | 1114 | 1115 | 1116 | 1117 |
| **BeiDou**    | 1121 | 1122 | 1123 | 1124 | 1125 | 1126 | 1127 |
| **NavIC**     | 1131 | 1132 | 1133 | 1134 | 1135 | 1136 | 1137 |



### Station Information

| Message Type | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| **1005**     | **Stationary RTK reference station ARP** (X/Y/Z ECEF, no height) |
| **1006**     | Stationary RTK reference station ARP with antenna height     |
| 1007         | Antenna descriptor                                           |
| 1008         | Antenna descriptor and serial number                         |
| **1033**     | Receiver and antenna descriptors                             |

:::tip
**Message 1005 or 1006** is essential for RTK operation. It tells the rover where the base station is located. Without it, RTK cannot function.

- **1005**: Base coordinates only (most commonly used)
- **1006**: Base coordinates + antenna height above marker
- **1033**: Provides receiver type, firmware version, antenna model — useful for diagnostics
:::

#### 1005 Message Fields

| Field                       | Bits | Description                                     |
| --------------------------- | ---- | ----------------------------------------------- |
| Message Number              | 12   | Always `1005`                                   |
| Reference Station ID        | 12   | Station identifier (0–4095)                     |
| ITRF Realization Year       | 6    | Reference frame year                            |
| GPS Indicator               | 1    | 1 = GPS service supported                       |
| GLONASS Indicator           | 1    | 1 = GLONASS service supported                   |
| Galileo Indicator           | 1    | 1 = Galileo service supported                   |
| Reference Station Indicator | 1    | 0 = Real, 1 = Virtual (VRS)                     |
| ARP ECEF-X                  | 38   | Antenna Reference Point X coordinate (0.0001 m) |
| Single Receiver Osc.        | 1    | Oscillator indicator                            |
| Reserved                    | 1    | —                                               |
| ARP ECEF-Y                  | 38   | Antenna Reference Point Y coordinate (0.0001 m) |
| Quarter Cycle Indicator     | 2    | —                                               |
| ARP ECEF-Z                  | 38   | Antenna Reference Point Z coordinate (0.0001 m) |



### Other Important Messages

| Message Type | Description                                               |
| ------------ | --------------------------------------------------------- |
| **1019**     | GPS ephemeris                                             |
| **1020**     | GLONASS ephemeris                                         |
| 1042         | BeiDou ephemeris                                          |
| 1044         | QZSS ephemeris                                            |
| 1045/1046    | Galileo ephemeris (F/NAV and I/NAV)                       |
| **1230**     | **GLONASS code-phase biases** (important for GLONASS RTK) |
| 4072         | Reference station (u-blox proprietary)                    |

:::warning GLONASS RTK — Don't Forget 1230!
When using GLONASS observations for RTK, **Message 1230** (GLONASS code-phase biases) is critical. Without it, GLONASS ambiguity resolution may fail or produce degraded results.

Always ensure your base station outputs **1230** when GLONASS MSM messages are enabled.
:::



## Recommended Message Sets

### Single Base RTK (Typical Configuration)

```
┌─────────────────────────────────────────────────────┐
│  Recommended RTCM Output for RTK Base Station       │
├──────────┬──────────────────────┬───────────────────┤
│ Message  │ Content              │ Output Rate       │
├──────────┼──────────────────────┼───────────────────┤
│ 1005     │ Base coordinates     │ 5 s               │
│ 1077     │ GPS MSM7             │ 1 s               │
│ 1087     │ GLONASS MSM7         │ 1 s               │
│ 1097     │ Galileo MSM7         │ 1 s               │
│ 1127     │ BeiDou MSM7          │ 1 s               │
│ 1230     │ GLONASS biases       │ 5 s               │
└──────────┴──────────────────────┴───────────────────┘
```

### Bandwidth-Constrained (Radio Link)

When using low-bandwidth radio links (e.g., 9600 bps), reduce data size:

```
┌─────────────────────────────────────────────────────┐
│  Low Bandwidth RTCM Configuration                   │
├──────────┬──────────────────────┬───────────────────┤
│ Message  │ Content              │ Output Rate       │
├──────────┼──────────────────────┼───────────────────┤
│ 1005     │ Base coordinates     │ 10 s              │
│ 1074     │ GPS MSM4             │ 1 s               │
│ 1084     │ GLONASS MSM4         │ 1 s               │
│ 1094     │ Galileo MSM4         │ 1 s               │
│ 1124     │ BeiDou MSM4          │ 1 s               │
│ 1230     │ GLONASS biases       │ 10 s              │
└──────────┴──────────────────────┴───────────────────┘
```



## Data Bandwidth Estimation

Approximate message sizes and bandwidth requirements:

| Message | Approx. Size (bytes) | At 1 Hz (bps) |
| ------- | -------------------- | ------------- |
| 1005    | 25                   | 200           |
| 1074    | 80–120               | 640–960       |
| 1077    | 150–250              | 1200–2000     |
| 1084    | 70–110               | 560–880       |
| 1087    | 130–220              | 1040–1760     |
| 1094    | 80–120               | 640–960       |
| 1097    | 140–230              | 1120–1840     |
| 1124    | 90–140               | 720–1120      |
| 1127    | 160–260              | 1280–2080     |
| 1230    | 14                   | 112           |

:::tip
**Full MSM7 (4 constellations at 1 Hz)** requires approximately **5000–8000 bps**.

**MSM4 (4 constellations at 1 Hz)** requires approximately **2500–4000 bps**.

For radio links, ensure your link bandwidth exceeds the RTCM data rate, or reduce output rate / constellation count.
:::



## Transport Methods

### 1. Serial Port (RS-232 / UART)

Direct connection between base station and rover:

```
[Base GNSS Receiver] ---Serial (RTCM)--> [Rover GNSS Receiver]
```

- Simple, low latency
- Limited by cable length

### 2. Radio Link (UHF/VHF)

```
[Base] ---Serial--> [Radio TX] )))  ((( [Radio RX] ---Serial--> [Rover]
```

- Range: 1–20+ km (depending on power and terrain)
- Bandwidth: typically 4800–19200 bps
- No internet required

### 3. NTRIP (Networked Transport of RTCM via Internet Protocol)

```
[Base] ---RTCM--> [NTRIP Caster (Server)] <--NTRIP Client-- [Rover]
                        (Internet)
```

NTRIP is the most common method for accessing CORS (Continuously Operating Reference Stations) networks.

| Component        | Role                                            |
| ---------------- | ----------------------------------------------- |
| **NTRIP Server** | Sends RTCM data to the caster                   |
| **NTRIP Caster** | Central server that manages streams and clients |
| **NTRIP Client** | Rover connects to caster to receive RTCM data   |

#### NTRIP Connection Parameters

| Parameter   | Example             |
| ----------- | ------------------- |
| Caster Host | `ntrip.example.com` |
| Port        | `2101`              |
| Mountpoint  | `RTCM3_MSM`         |
| Username    | `user`              |
| Password    | `pass`              |
| Protocol    | NTRIP v1.0 / v2.0   |

:::note
When using NTRIP, the rover typically sends its approximate position (via **GGA** sentence) to the caster, so the caster can select the nearest base station or generate VRS corrections.
:::



## Inspecting RTCM Data

Since RTCM 3.x is binary, you cannot read it directly. Here are tools to decode and inspect RTCM messages:

### RTKLIB — `STRSVR` & `RTKNAVI`

Free, open-source GNSS toolkit:
- 👉 [https://github.com/tomojitakasu/RTKLIB](https://github.com/tomojitakasu/RTKLIB)
- Can decode, log, and relay RTCM streams

### SNIP NTRIP Caster

Free for limited use, excellent RTCM monitoring:
- 👉 [https://www.use-snip.com](https://www.use-snip.com)

### Python — `pyrtcm`

```bash
pip install pyrtcm
```

```python
from pyrtcm import RTCMReader
import serial

stream = serial.Serial('/dev/ttyUSB0', 115200, timeout=3)
rtr = RTCMReader(stream)

for raw_data, parsed_data in rtr:
    print(parsed_data)
```

### Quick Binary Identification

You can identify RTCM data in a byte stream by looking for:

```
0xD3  →  RTCM 3.x frame preamble
```

To extract the message type from the first two bytes of payload:

```python
# First 2 bytes of message data contain 12-bit message type
msg_type = ((payload[0] << 4) | (payload[1] >> 4)) & 0xFFF
print(f"Message Type: {msg_type}")
```



## Troubleshooting

### RTK Not Converging

| Symptom                  | Possible Cause               | Solution                                     |
| ------------------------ | ---------------------------- | -------------------------------------------- |
| No RTK float/fix         | Missing 1005/1006 message    | Enable base station coordinates message      |
| Stuck at float           | Missing GLONASS biases       | Enable message 1230                          |
| Stuck at float           | Baseline too long            | Reduce base-rover distance (< 30 km typical) |
| Intermittent fix         | Low bandwidth / data dropout | Check radio link / increase baud rate        |
| Position jumps           | Wrong base coordinates       | Verify base station ARP position             |
| No corrections received  | NTRIP connection failed      | Check host, port, mountpoint, credentials    |
| High age of differential | Data latency > 5s            | Check communication link quality             |

### Verifying RTCM Input on Rover

Most GNSS receivers report correction status in the **GGA** sentence (field 6):

| GGA Fix Quality | Meaning                     |
| --------------- | --------------------------- |
| 1               | Autonomous (no corrections) |
| 2               | DGPS                        |
| 4               | **RTK Fixed** ✅             |
| 5               | **RTK Float**               |

If fix quality stays at `1`, the rover is not receiving or processing RTCM corrections.



:::info
RTCM Standard 10403.x is a **copyrighted specification**. This page provides a practical overview for implementation and usage. For the full official specification, please purchase from the [RTCM website](https://www.rtcm.org).
:::

