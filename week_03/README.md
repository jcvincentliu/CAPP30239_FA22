
# Data for the Final Project

## Dataset Information 

| Info | Description |
| :---: | :----------: |
| Title | NIBRS 2021 DC data |
| Agency | FBI (Federal Bureau of Investigation) |
| Location | Washington, DC (refer to the data) |
| Link | The dataset can be downloaded at the [FBI Crime Data Explorer](https://crime-data-explorer.app.cloud.gov/pages/downloads). On this page, go to the Crime Incident-Based Data by State section, select DC in Location and 2021 in Year, and press Download. The same section also includes instructions on scraping the data using Postgresql as well as an ER diagram that shows the relationships between different datasets.|
  

## Data Description

For the course final project, I will be using 2021 DC Arrests data collected in the [National Incident-Based Reporting System (NIBRS)](https://www.fbi.gov/how-we-can-help-you/need-an-fbi-service-or-more-information/ucr/nibrs), which is part of the influential Uniform Crime Reporting (UCR) database. NIBRS records a wide array of information from the nature of arrests to the demography of crime victims, making it a valuable source for researchers who wish to study crimes, trends, and crime victims (note: the field victimology is probably less known to many but its importance is undeniable). As part of the cumulative UCR database, all data voluntarily comes from local and federal-level law enforcement agencies whose participation of the program is highly encouraged by the FBI but not compulsory. 

The DC Arrestee's data contain information about the race, age, sex of arrestees as well as when and where arrests happened. Combined with the Arrestee Weapon dataset and some other ones, we can also acquire more details of the arrests, for example, what weapon was involved if any and what harms were imposed on the victims. For this project, I am particularly interested in the question of "who did what", that is, who those arrestees were and what they had done.

A special note here: the dataset I am using only includes information about people who were arrested rather than who commited crimes. By the *Fourth Amendment*, the term "arrest" requires the existence of a probable cause, meaning to arrest someone, officers must have reasonable beliefs that a crime was/is being/will be done by this particular individual. The crime could be as minor as a petty misdemeanor or as serious as an index crime. It should also be noted that *most crimes did not result in an arrest* for which arrest information can only be used to shed light on arrestees in lieu of criminals.  

## Project Information 

As a crime researcher who specialize in policing, I am naturally interested in knowing about who were arrested in a specific year, which can be used to showcase the racial biases in the policing practice. Compared to stops, frisks, or other manifestions of police powers, arrests represent a high-level of invasion into personal privacy, therefore, it also requires a high-level probable cause from law enforcement agencies who conduct the arrest. That is to say, all arrest decisions must be based on high-level of reasons rather than pure guesses or instincts. In real-life, we usually see not all arrests were reasonable and apporporiate given the circumstance. With the dataset, I am interested in knowing about if a certain socioeconomic and racial group was arrested disproportionately and what led to this disproportion.   

To answer this question, I first went to the [UCR page](https://www.fbi.gov/how-we-can-help-you/need-an-fbi-service-or-more-information/ucr), which has all crime information recorded by the FBI. I initially heard about the UCR data in my undergraduate sociology of criminology classes in which UCR and another data, NCVS (National Crime Victimization Survey), were commonly referred as the "bibles" of criminology, given how authorative and official they are. It is thus natural that when I thought about the question above, I thought about UCR. The idea of analyzing and visualizing a UCR data was further reinforced during my conversation with Ms. Sarah, the director of strategy in Chicago Police Department and my Herris Mentorship Program mentor, who recommended me look at the UCR data first should I have any interst in doing a crime/arrest-related project. It turns out that her recommendation was very helpful, as I found a tons of information from the UCR data page. 

## Project Questions 

I seek to understand the following questions:
- What racial group was arrested the most often in 2021 by Metropolitan Police Department officers?
- Which age group had the most arrests?
- How many arrests involved weapons? What weapons?
- What were the reasons of arrest, ranking from top (the most frequent reason) to bottom? 

To answer them, I will need a left join between the arrests data and arrest weapon data on the incidence_id, the common variable. I will complete necessary data cleaning and wrangling steps as soon as I can.  

The afreomentioned questions can be realized in the following way:

| Question | Solution | Visualization |
| :---: | :---: | :---: |
| Racial group| a summary table by variable `race_id`| bar chart or preferably, a waffle chart | 
| Age group | a summary table by a new variable that comes from variable `age_id` |vertical stacked bar chart |
| Weapon involvement | a summary table by variable `weapon_id` | bubble chart or bar chart|
| Offense Type | a summary table by variable `offense_id` | lollipop chart or bar chart|

## Future Concerns

At this point, I am curious about how to make waffle chart, bubble chart or lollipop chart using D3.js. These charts are not that conventional but can be good alternatives of bar charts to show group information (former two are used to show proportions, while the latter one is a concised version of bar charts with only lines and dots). 

For the dataset, I do no have questions at this point but I am sure I will be as I start on data cleaning and wrangling. 

The data will be primary but I may join a few NIBRS datasets to get my final cumulative data. 