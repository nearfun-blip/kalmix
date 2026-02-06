---

sidebar_position: 1
---



# NMEA0183 Protocol



**NMEA 0183** is a standard defined by the [National Marine Electronics Association (NMEA)](https://www.nmea.org/) for communication between marine electronics and, most commonly, GNSS receivers. It uses simple ASCII-based serial communication to transmit position, velocity, time, and satellite information.

Almost all consumer and professional GNSS receivers support NMEA 0183 output, making it the most widely used protocol for location data exchange.

| Item                    | Specification                             |
| ----------------------- | ----------------------------------------- |
| **Standard**            | NMEA 0183 (v2.x / v3.x / v4.x)            |
| **Data Format**         | ASCII                                     |
| **Baud Rate**           | 4800 (default), 9600, 38400, 115200, etc. |
| **Interface**           | RS-232 / TTL UART / USB                   |
| **Max Sentence Length** | 82 characters (including `$` and `\r\n`)  |



## Sentence Structure

Every NMEA 0183 sentence follows this general format:

```
$<TalkerID><SentenceID>,<field1>,<field2>,...,<fieldN>*<checksum><CR><LF> 
```

### Breakdown

| Part            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `$`             | Start delimiter (or `!` for encapsulation sentences)         |
| **Talker ID**   | Two-character identifier indicating the data source (e.g., `GP`, `GL`, `GN`, `GA`) |
| **Sentence ID** | Three-character identifier for the sentence type (e.g., `GGA`, `RMC`) |
| `,`             | Field delimiter                                              |
| `*`             | Checksum delimiter                                           |
| **Checksum**    | Two-digit hex XOR of all characters between `$` and `*` (exclusive) |
| `<CR><LF>`      | Carriage return and line feed (end of sentence)              |

### Talker IDs

| Talker ID   | Constellation                  |
| ----------- | ------------------------------ |
| `GP`        | GPS (USA)                      |
| `GL`        | GLONASS (Russia)               |
| `GA`        | Galileo (Europe)               |
| `GB` / `BD` | BeiDou (China)                 |
| `GN`        | Multi-constellation (combined) |
| `GQ`        | QZSS (Japan)                   |
| `GI`        | NavIC / IRNSS (India)          |



## Common Sentence Types

### GGA — Global Positioning System Fix Data

Provides essential fix data including 3D position and accuracy.

```
$GNGGA,014653.00,3150.78749,N,11711.94228,E,1,12,0.80,54.6,M,-11.0,M,,*4F
```

| Field | Example       | Description                                                  |
| ----- | ------------- | ------------------------------------------------------------ |
| 1     | `014653.00`   | UTC time: `01:46:53.00`                                      |
| 2     | `3150.78749`  | Latitude: 31° 50.78749'                                      |
| 3     | `N`           | Latitude direction: N = North                                |
| 4     | `11711.94228` | Longitude: 117° 11.94228'                                    |
| 5     | `E`           | Longitude direction: E = East                                |
| 6     | `1`           | Fix quality (0=Invalid, 1=GPS, 2=DGPS, 4=RTK Fixed, 5=RTK Float) |
| 7     | `12`          | Number of satellites in use                                  |
| 8     | `0.80`        | HDOP (Horizontal Dilution of Precision)                      |
| 9     | `54.6`        | Altitude above mean sea level (meters)                       |
| 10    | `M`           | Altitude units: Meters                                       |
| 11    | `-11.0`       | Geoidal separation (meters)                                  |
| 12    | `M`           | Geoidal separation units: Meters                             |
| 13    |               | Age of differential correction (seconds)                     |
| 14    |               | Differential reference station ID                            |

:::tip Fix Quality Values
| Value | Description                 |
| ----- | --------------------------- |
| 0     | Invalid / No fix            |
| 1     | Autonomous GPS fix          |
| 2     | Differential GPS (DGPS) fix |
| 4     | RTK Fixed solution          |
| 5     | RTK Float solution          |
| 6     | Estimated (Dead Reckoning)  |

:::

### RMC — Recommended Minimum Specific GNSS Data

The most commonly used sentence, containing position, velocity, and time.

```
$GNRMC,014653.00,A,3150.78749,N,11711.94228,E,0.009,,060125,,,A,V*18
```

| Field | Example       | Description                                         |
| ----- | ------------- | --------------------------------------------------- |
| 1     | `014653.00`   | UTC time                                            |
| 2     | `A`           | Status: A = Active, V = Void                        |
| 3     | `3150.78749`  | Latitude                                            |
| 4     | `N`           | Latitude direction                                  |
| 5     | `11711.94228` | Longitude                                           |
| 6     | `E`           | Longitude direction                                 |
| 7     | `0.009`       | Speed over ground (knots)                           |
| 8     |               | Course over ground (degrees true)                   |
| 9     | `060125`      | Date: `06 Jan 2025`                                 |
| 10    |               | Magnetic variation (degrees)                        |
| 11    |               | Magnetic variation direction                        |
| 12    | `A`           | Mode indicator (A=Autonomous, D=DGPS, E=DR, N=None) |



### GSA — GNSS DOP and Active Satellites

```
$GNGSA,A,3,10,12,21,23,24,25,26,29,31,32,,,1.10,0.80,0.76,1*0A
```

| Field | Description                            |
| ----- | -------------------------------------- |
| 1     | Mode: A = Auto, M = Manual             |
| 2     | Fix type: 1 = No fix, 2 = 2D, 3 = 3D   |
| 3–14  | Satellite PRN numbers used in solution |
| 15    | PDOP                                   |
| 16    | HDOP                                   |
| 17    | VDOP                                   |



### GSV — GNSS Satellites in View

Provides information about visible satellites, including elevation, azimuth, and signal strength.

```
$GPGSV,3,1,12,02,30,184,20,10,60,088,35,12,15,320,22,21,45,210,30,1*6A
```

| Field | Description                                  |
| ----- | -------------------------------------------- |
| 1     | Total number of GSV sentences                |
| 2     | Current sentence number                      |
| 3     | Total satellites in view                     |
| 4     | Satellite PRN number                         |
| 5     | Elevation (degrees, 0–90)                    |
| 6     | Azimuth (degrees, 0–359)                     |
| 7     | SNR / C/N0 (dB-Hz, 0–99, null = not tracked) |
| ...   | Repeat fields 4–7 for up to 4 satellites     |



### GST — GNSS Pseudorange Error Statistics

Provides pseudorange noise statistics, including RMS, standard deviations of latitude/longitude/altitude errors. Useful for evaluating real-time positioning accuracy.

```
$GNGST,014653.00,1.5,0.98,0.72,35.0,0.85,0.65,1.90*5A
```

| Field | Example     | Description                                                  |
| ----- | ----------- | ------------------------------------------------------------ |
| 1     | `014653.00` | UTC time: `01:46:53.00`                                      |
| 2     | `1.5`       | RMS value of the standard deviation of the range inputs to the navigation process (meters) |
| 3     | `0.98`      | Standard deviation of semi-major axis of error ellipse (meters) |
| 4     | `0.72`      | Standard deviation of semi-minor axis of error ellipse (meters) |
| 5     | `35.0`      | Orientation of semi-major axis of error ellipse (degrees from true north) |
| 6     | `0.85`      | Standard deviation of latitude error (meters), 1-sigma       |
| 7     | `0.65`      | Standard deviation of longitude error (meters), 1-sigma      |
| 8     | `1.90`      | Standard deviation of altitude error (meters), 1-sigma       |



### VTG — Course Over Ground and Ground Speed

```
$GNVTG,,T,,M,0.009,N,0.017,K,A*34
```

| Field | Description                            |
| ----- | -------------------------------------- |
| 1     | Course over ground (true, degrees)     |
| 2     | Reference: T = True                    |
| 3     | Course over ground (magnetic, degrees) |
| 4     | Reference: M = Magnetic                |
| 5     | Speed over ground (knots)              |
| 6     | Unit: N = Knots                        |
| 7     | Speed over ground (km/h)               |
| 8     | Unit: K = Kilometers per hour          |
| 9     | Mode indicator                         |



### GLL — Geographic Position – Latitude/Longitude

$GNGLL,3150.78749,N,11711.94228,E,014653.00,A,A*67

| Field | Description                    |
| ----- | ------------------------------ |
| 1     | Latitude                       |
| 2     | N/S indicator                  |
| 3     | Longitude                      |
| 4     | E/W indicator                  |
| 5     | UTC time                       |
| 6     | Status: A = Valid, V = Invalid |
| 7     | Mode indicator                 |



## Checksum Calculation

The checksum is an **XOR** of all characters between `$` and `*` (not including them).

### Example (Python)

```python
def nmea_checksum(sentence: str) -> str:
    """
    Calculate the NMEA 0183 checksum.
    Input should be the raw sentence string (with or without $ and *).
    """
    # Extract content between $ and *
    if sentence.startswith('$') or sentence.startswith('!'):
        sentence = sentence[1:]
    if '*' in sentence:
        sentence = sentence[:sentence.index('*')]

    checksum = 0
    for char in sentence:
        checksum ^= ord(char)

    return f"{checksum:02X}"


# Example
raw = "$GNGGA,014653.00,3150.78749,N,11711.94228,E,1,12,0.80,54.6,M,-11.0,M,,*4F"
print(nmea_checksum(raw))  # Output: 4F
Coordinate Format
NMEA uses the Degrees and Decimal Minutes (DDM) format:
    
Latitude:   DDMM.MMMMM    (e.g., 3150.78749 → 31° 50.78749')
Longitude:  DDDMM.MMMMM   (e.g., 11711.94228 → 117° 11.94228')
Conversion to Decimal Degrees
Decimal Degrees
=
Degrees
+
Minutes
60
Decimal Degrees=Degrees+ 
60
Minutes
```



***Example:***

3150.78749, N
→ 31 + (50.78749 / 60) = 31.846458°N
References
NMEA 0183 Standard — NMEA Official
NMEA Revealed — GPSD Project
u-blox NMEA Protocol Description
:::info
This page is intended as a quick reference. For the full official specification, please refer to the **[NMEA official website](https://www.nmea.org/)**.

Or you can refer to the website **[https://gpsd.gitlab.io/gpsd/NMEA.html](https://gpsd.gitlab.io/gpsd/NMEA.html)** too.

:::
