from django.shortcuts import redirect, render
from django.urls import reverse
import pandas as pd
from django.contrib import messages
from django.http import JsonResponse
from django.http import FileResponse

def home(request):
    if request.method == 'POST':
        num_mrs = request.POST.get('num_mrs')
        return redirect(reverse('metalogs') + f'?num_mrs={num_mrs}')

    return render(request, 'metalogs/home.html')

def metalogs(request):
    num_mrs = request.GET.get('num_mrs')

    if request.method == 'GET':
        return render(request, 'metalogs/metalogs.html', get_initial_context())

    result = process_uploaded_file(request, num_mrs)
    
    if isinstance(result, dict):
        return render(request, 'metalogs/charts.html', result)
    elif result == 'upload':
        return render(request, 'metalogs/metalogs.html')
    else:
        return process_uploaded_file(request, num_mrs)




def process_uploaded_file(request, num_mrs):
    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        messages.error(request, 'No file uploaded')
        return 'upload'
    
    try:
        log_csv = pd.read_csv(uploaded_file)
        is_multiple_type = request.POST.get('analysis_option') == 'multiple'
        missing_columns = get_missing_columns(log_csv, is_multiple_type, int(num_mrs))

        if missing_columns:
            messages.error(request, f'Missing columns in log file: {", ".join(missing_columns)}')
            return 'upload'
        
        chart_data = get_chart_data(log_csv)
        chart_data2 = get_chart_data2(log_csv)
        chart_data3 = get_chart_data3(log_csv)
        
        return {
            'missing_columns': None,
            'chart_data': chart_data,
            'chart_data2': chart_data2,
            'chart_data3': chart_data3,
        }

    except pd.errors.EmptyDataError as e:
        messages.error(request, 'The uploaded file is empty or in an unsupported format.')
        return 'upload'

    except Exception as e:
        messages.error(request, f'Error processing file: {str(e)}')
        return 'upload'


def get_initial_context():
    return {
        'missing_columns': None,
        'chart_data': None,
        'chart_data2': {'labels': [], 'data': []},
        'chart_data3': None,
    }

def get_missing_columns(log_csv, is_multiple_type, num_mrs):
    all_columns = log_csv.columns

    if is_multiple_type:
        mr_columns = [
            f"input_testData",
            f"output_testInput",
            f"output_MR",
            f"MR_checker",
        ]
        required_columns = [f"{col}_MR{i}" for i in range(1, num_mrs + 1) for col in mr_columns]
    else:
        mr_checker_columns = [f"MR{i}_checker" for i in range(1, num_mrs + 1)]
        required_columns = [
            # "input_testData",
            "output_testInput",
        ] + [f"output_MR{i}" for i in range(1, num_mrs + 1)] + mr_checker_columns
    print(required_columns)
    return [col for col in required_columns if col not in log_csv.columns]

def get_chart_data(log_csv):
    rule_violations = log_csv.iloc[:, 8:].apply(lambda x: (x == 'Violated').sum())
    labels = log_csv.columns[8:].tolist()
    data = rule_violations.tolist()
    return {'labels': labels, 'data': data}

def get_chart_data2(log_csv):
    checker_columns = log_csv.filter(like='_checker').columns
    crashed_rows = log_csv[checker_columns].apply(lambda x: x[~x.isin(['Violated', 'Not-violated'])].count())
    labels = checker_columns.tolist()
    data = crashed_rows.tolist()
    return {'labels': labels, 'data': data}

def get_chart_data3(log_csv):
    chart_data3_list = []
    required_columns = log_csv.filter(like='_checker').columns
    
    for idx, column in enumerate(required_columns):
        rule_name = column.replace("_checker", "")
        violated_rows = log_csv[log_csv[column] == 'Violated']
        output_column = f'output_{rule_name}'
        
        if output_column not in log_csv.columns:
            continue  
        cleaned_values = violated_rows[output_column].apply(pd.to_numeric, errors='coerce').dropna()

        if not cleaned_values.empty:
            chart_data3_list.append({
                'label': f'{output_column} for {rule_name} Violations',
                'data': cleaned_values.tolist(),
                'backgroundColor': 'rgba(255, 99, 132, 0.2)',
                'borderColor': 'rgba(255, 99, 132, 1)',
                'borderWidth': 1,
            })

    labels = [item['label'] for item in chart_data3_list]
    datasets = chart_data3_list
    return {'labels': labels, 'datasets': datasets}