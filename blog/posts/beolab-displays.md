---
title: Powerlink MK2 Data line intermediate
date: 2026-10-09
---

## Introduction
I only have one B&O product (Beocenter 9500) that is capable of powering on displays of compatible speakers (such as the Beolab 5000s), but two pairs of speakers in separate rooms.
My idea is simple, take a microcontroller, put it in between the source and speakers, splice in a data signal that makes the displays of compatible B&O speakers power on, which then allows us to display source and volume.

Unfortunately the data signal is not officially documented, so we have to reverse engineer it, for which we need a compatible product that produces this data signal (such as the Beocenter 9500, which i will be using for this) and a logic analyzer.
With this setup we can capture the data signal (Pin 6) while the Beocenter 9500 powers up the speakers, changes source and volume, then decode the recorded signals and replicate them in a desired way with a microcontroller, so that the displays are functional without the Beocenter 9500.

(Note: The logic analyzer is necessary, because from what i read the data line can be up to 5V, but GPIO pins can only do 3.3V)

Some issues to note before we continue:
- Powerlink is shielded and will absolutely unusable if our passthrough isn't properly shielded.
- We will also need to ground our data signal using Pin 7.

## Overview

Powerlink MK2 has 8 lines which are labelled in as such:
![[chrome_T2AxCGWHXU.png]]

**Our diagram:**
![[Pasted image 20261007163239.png]]
