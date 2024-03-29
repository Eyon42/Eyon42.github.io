---
layout: project_blogpost
project_name: "Musical notes distribution graphs"
author: "Francesco Gentile"
---

Recently i started to try and learn more songs on guitar by ear. An important part of doing that is learning which key is the song in. So I thought it would be useful to see the distribution of the notes in the song to figure that out.

I started looking up how could I get the note data. After looking at a bunch of different formats for storing music data I decided to first test with MIDI, as it is a pretty common format and had a [well documented library](https://mido.readthedocs.io/).

After some reading and exploring in a [Jupyter Notebook](https://github.com/Eyon42/MIDI-Note-Analizer/blob/master/Music_analyzer.ipynb) i wrote a couple functions to extract the note data and count it. Then i plotted the result with [Matplotlib](https://matplotlib.org/).

The MIDI files that I had for my first tests were exported from a Guitar Pro file. So I decided to add the posibility to get data from Guitar Pro Files directly and skip having to export each song manually. For this i used the [PyGuitarPro](https://pyguitarpro.readthedocs.io) Library.

## Some extra examples

<h3 class="center"> Cementary Gates - Pantera </h3>
![Cementary Gates - Pantera](/assets/Images/Cemetary%20Gates.png)

<h3 class="center"> Dystopia - Megadeth </h3>
![Dystopia - Megadeth](/assets/Images/Dystopia.png)

<h3 class="center"> Inmortal Melancholy - Epica </h3>
![Inmortal Melancholy - Epica](/assets/Images/Immortal%20Melancholy.png)

<h3 class="center"> Bohemian Rhapsody - Queen </h3>
![Bohemian Rhapsody - Queen](/assets/Images/Q-BhR.png)

All the code for the visualizations is available in the "Source code" button at the top of the page.