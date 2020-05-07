import sqlite3
import csv

conn = sqlite3.connect('sequitur.db')

c = conn.cursor()

c.execute('''SELECT title,authors_list,journal_name,date_added,abstract FROM (SELECT article_id,name,date_added,journal_name,abstract FROM entrydata WHERE abstract IS NOT NULL) INNER JOIN (SELECT id,title,authors_list FROM artilcesid WHERE authors_list LIKE 'A. A%' OR authors_list LIKE 'A. B%' OR authors_list LIKE 'A. C%' LIMIT 550000) ON id = article_id''')

new_list = c.fetchall()

with open("out.csv", "w") as f:
    w = csv.writer(f)
    w.writerows(new_list)
