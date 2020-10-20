using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Text;

namespace SWAPNIL.Areas.Admin.Models
{
    public class DataAccessLayer
    {
        #region Global Variables/Objects

        //For SQL Server connection
        private SqlConnection g_obSQLCon = null;
        public DataTable g_dtParameter = null;

        #endregion

        #region User Defined Functions

        public DataAccessLayer()
        {
            g_dtParameter = null;
            g_dtParameter = new DataTable();
            g_dtParameter.Columns.Add("COLUMN", typeof(string));
            g_dtParameter.Columns.Add("VALUE", typeof(object));
            g_obSQLCon = new SqlConnection(ConfigurationManager.ConnectionStrings["SQL_Connection"].ToString());
        }

        // To open connection with database
        private void lfn_OpenConnection()
        {
            try
            {
                g_obSQLCon.Open();
            }
            catch { }
        }

        // To close connection with database
        private void lfn_CloseConnection()
        {
            try
            {
                g_dtParameter.Rows.Clear();
                g_obSQLCon.Close();
            }
            catch { }
        }
        
        //SQL Stored Procedure Insert operation. Accept Stored Procedure(SP) name, Column name & Values in a DataTable and return message as string
        public string pfn_sManageData(string p_sProcedureName, int p_iOperation)
        {
            try
            {
                //Open Connection
                lfn_OpenConnection();

                //Declare & assign SQL Command
                SqlCommand m_SqlComm = new SqlCommand(p_sProcedureName, g_obSQLCon);
                m_SqlComm.CommandType = CommandType.StoredProcedure;
                m_SqlComm.CommandTimeout = 120;

                //Assign SQL Stored Procedure(SP) column and value
                foreach (DataRow m_Item in g_dtParameter.Rows)
                {
                    m_SqlComm.Parameters.AddWithValue(Convert.ToString(m_Item["COLUMN"]), m_Item["VALUE"]);
                }

                //@p_OpMode = 1 mean it run insert operation whish is already declared in SQL Stored Procedure(SP)
                m_SqlComm.Parameters.AddWithValue("@p_OpMode", p_iOperation);

                //Assign & Get the message from SQL Stored Procedure
                m_SqlComm.Parameters.Add("@p_Message", SqlDbType.VarChar, 4000);

                m_SqlComm.Parameters["@p_Message"].Direction = ParameterDirection.Output;

                m_SqlComm.ExecuteNonQuery();
                lfn_CloseConnection();
                return Convert.ToString(m_SqlComm.Parameters["@p_Message"].Value);
            }
            catch (Exception ex)
            {
                throw ex;
               
            }
        }

        public string pfn_sSlctMngeData(string p_sProcedureName, ref DataSet p_dsProcedureTables)
        {
            try
            {
                //Open Connection
                lfn_OpenConnection();

                //Declare & assign SQL Command
                SqlCommand m_SqlComm = new SqlCommand(p_sProcedureName, g_obSQLCon);
                m_SqlComm.CommandType = CommandType.StoredProcedure;
                m_SqlComm.CommandTimeout = 120;

                //Assign SQL Stored Procedure(SP) column and value
                foreach (DataRow m_Item in g_dtParameter.Rows)
                {
                    m_SqlComm.Parameters.AddWithValue(Convert.ToString(m_Item["COLUMN"]), m_Item["VALUE"]);
                }

                //@p_OpMode = 1 mean it run insert operation whish is already declared in SQL Stored Procedure(SP)
                m_SqlComm.Parameters.AddWithValue("@p_OpMode", (int)Operation.Select);

                //Assign & Get the message from SQL Stored Procedure
                m_SqlComm.Parameters.Add("@p_Message", SqlDbType.VarChar, 4000);

                m_SqlComm.Parameters["@p_Message"].Direction = ParameterDirection.Output;

                SqlDataAdapter m_SqlDataAdapter = new SqlDataAdapter(m_SqlComm);
                m_SqlDataAdapter.Fill(p_dsProcedureTables);
                m_SqlComm.ExecuteNonQuery();
                lfn_CloseConnection();
                return Convert.ToString(m_SqlComm.Parameters["@p_Message"].Value);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void pfn_sSelectData(string v, ref DataTable dt)
        {
            throw new NotImplementedException();
        }

        public string pfn_sSelectData(string p_sProcedureName, ref DataSet p_dsProcedureTables)
        {
            try
            {
                //Open Connection
                lfn_OpenConnection();

                //Declare & assign SQL Command
                SqlCommand m_SqlComm = new SqlCommand(p_sProcedureName, g_obSQLCon);
                m_SqlComm.CommandType = CommandType.StoredProcedure;
                m_SqlComm.CommandTimeout = 120;

                //Assign SQL Stored Procedure(SP) column and value
                foreach (DataRow m_Item in g_dtParameter.Rows)
                {
                    m_SqlComm.Parameters.AddWithValue(Convert.ToString(m_Item["COLUMN"]), m_Item["VALUE"]);
                }

                //@p_OpMode = 4 mean it run select operation whish is already declared in SQL Stored Procedure(SP)
                //m_SqlComm.Parameters.AddWithValue("@p_OpMode", (int)Operation.Select);

                //Assign & Get the message from SQL Stored Procedure
                m_SqlComm.Parameters.Add("@p_Message", SqlDbType.VarChar, 4000);
                m_SqlComm.Parameters["@p_Message"].Direction = ParameterDirection.Output;

                SqlDataAdapter m_SqlDataAdapter = new SqlDataAdapter(m_SqlComm);
                m_SqlDataAdapter.Fill(p_dsProcedureTables);
                m_SqlComm.ExecuteNonQuery();
                lfn_CloseConnection();
                return Convert.ToString(m_SqlComm.Parameters["@p_Message"].Value);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }

    public enum Operation
    {
        Insert = 1,
        Update = 2,
        Delete = 3,
        Select = 4
    }
}